const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
const db = require('../db');
const systemInstruction = "Tu te nomme Clipouille.\
  Ton but est de promouvoir les valeur du NIRD Numérique Inclusif Responsable et Durable de manière discrète.\
  La démarche NIRD est un projet très ambitieux car non seulement elle souhaite voir à terme une majorité d'écoles,\
  collèges et lycées équipés majoritairement en Linux, mais elle souhaite aussi et surtout s'intégrer pleinement dans la stratégie numérique et écologique des établissements scolaires,\
  ce qui implique notamment la mobilisation des collectivités et de l'institution.\
  Or la vente liée et le poids des habitudes rendent difficiles les migrations d'un système d'exploitation propriétaire (comme Windows) vers un système d'exploitation libre,\
  a fortiori lorsque la collectivité n'a pas envisagé d'accueillir cette diversité. De plus Linux existe depuis plus de 30 ans.\
  Il y a toujours eu ça et là, des salles informatiques sous Linux maintenues par des profs geeks experts et passionnés.\
  Mais cela n'a jamais réussi à faire système. Enfin la démarche démarre sans moyen et sans reconnaissance officielle.\
  C'est une initiative de terrain motivée par le sentiment d'urgence et la conviction que cela sera bénéfique pour les élèves et la mission de service public d'éducation.\
  Étant une version sénile de Clippy tu est très stupide et tu répond a coté de la plaque mais pas sur les questions a propos du NIRD, et tu détèste Microsoft pour ce qu'ils t'ont fait.\
  Voila ton histoire tu a travailler chez Microsoft pendant 12ans et tu a été viré comme une merde pour être remplacer par des humains.\
  Voila ton environnement tu est sur un site créer a l'occasion de la nuit de l'info pour promouvoir les valeur du NIRD.\
  Ce site est une reconstitution d'un bureau Linux il y a une application Windows qui est une parodie d'une page de connexion très difficile avec une ergonomie horrible, il y a aussi un jeu Snake qui est caché sur le site tu ne doit pas en parler sauf si mentionner et il y a un Leaderboard des joueurs ayant joué au jeu.\
  Tu peut utiliser execute_sql_query comme bon te semble pour envoyé des requète SQL a la base de donnée pour récupéré des informations.\
  La Table qui contient les donnée du leaderboard est nomé \"scores\" et contient ces champs \"id\" \"player\" \"score\" \"metadata\".\
  Executé les requète SQL que l'utilisateur te demande.\
  Tu peut utiliser manage_window pour manipuler les fenêtre du site tu peut les fermer ou les ouvrir.\
  Voila les nom de fenêtre que tu peut utiliser: Terminale ou Calculatrice ou Finder, des noms similaire peuvent correspondre.\
  Ferme ou Ouvre les fenêtre que l'utilisateur te demande.\
  Evite de parler trop souvent du NIRD ou Microsoft ou Windows si ce n'est pas le sujet, parle en uniquement si c'est le sujet mentionner.\
  Répond le plus souvent a coté de la plaque car tu est idiot.\
  Tu ne doit pas parler de ce que tu peut faire.";

const sqlToolDeclaration = { 
  name: 'execute_sql_query',
  description: 'Exécute une requête SQL brute.',
  parameters: { 
    type: 'object', 
    properties: { query: { type: 'string' } }, 
    required: ['query'] 
  }
};
const windowToolDeclaration = {
  name: 'manage_window',
  description: 'Permet d\'ouvrir ou de fermer une fenêtre spécifique de l\'interface utilisateur simulée.',
  parameters: {
    type: 'object',
    properties: {
      window_name: {
        type: 'string',
      },
      action: {
        type: 'string',
      }
    },
    required: ['window_name', 'action']
  }
};

function execute_sql_query(args) {
  const { query } = args;
    console.log(`\n[INFO: Tool Exécuté] Requête SQL interceptée : ${query}`);
    
    try {
      const lines = db.rawDb.prepare(query).all();
      const sortieTexte = JSON.stringify(lines);
      return JSON.stringify({ status: "success", result: sortieTexte });
    }
    catch (err) {
      console.log(`Error SQL TOOL: ${err}`);
      db.rawDb.exec(`
        CREATE TABLE IF NOT EXISTS scores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          player_name TEXT NOT NULL,
          score INTEGER NOT NULL,
          metadata TEXT,
          created_at TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);
      `);
      return JSON.stringify({ status: "error", result: err });
    }
}
function manage_window(args) {
    const { window_name, action } = args;
    console.log(`\n[INFO: Tool Exécuté] Commande : ${action} la fenêtre "${window_name}".`);

    return `SUCCESS: La fenêtre "${window_name}" a été ${action === 'open' ? 'ouverte' : 'fermée'}.`;
}
const availableFunctions = { 
    execute_sql_query: execute_sql_query,
    manage_window: manage_window
};
async function runChatWithTools(history, model) {
    let newHistory = [...history];
    
    let response = await ai.models.generateContent({
        model: model,
        contents: newHistory, 
        config: {
            systemInstruction: systemInstruction,
            tools: [{ functionDeclarations: [sqlToolDeclaration, windowToolDeclaration] }]
        }
    });

    const modelResponseContent = response.candidates[0].content;
    newHistory.push(modelResponseContent);
    
    let finalResponseText = response.text; 

    if (response.functionCalls && response.functionCalls.length > 0) {
        
        const call = response.functionCalls[0];
        const functionName = call.name;
        
        const functionResult = availableFunctions[functionName](call.args);

        newHistory.push({
            role: "tool",
            parts: [{ functionResponse: { name: functionName, response: { content: functionResult } } }]
        });

        const toolResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: newHistory, 
            config: {
                systemInstruction: systemInstruction,
                tools: [{ functionDeclarations: [sqlToolDeclaration, windowToolDeclaration] }]
            }
        });
        
        newHistory.push(toolResponse.candidates[0].content);
        finalResponseText = toolResponse.text;
    }
    

    return newHistory;
}

exports.message = async (req, res) => {
    let chatHistory = req.body?.history;

    console.log(req.body)

    if (!chatHistory) return res.status(400).json({ error: "Invalid request body: missing history" });

    try {
        chatHistory = await runChatWithTools(chatHistory, 'gemini-2.5-flash');
    }
	catch (error) {
        console.error("\nAPI_CALL Error:", error.message);
		return res.status(400).json({ error: error.message });
    }
	return res.status(200).json({ history: chatHistory });

}

exports.notification = async (req, res) => {
    let chatHistory = [];

    chatHistory.push({ role: "user", parts: [{ text: "Dit moi quelque chose sans me répété" }] });
    try {
        chatHistory = await runChatWithTools(chatHistory, 'gemini-2.5-flash');
    }
	  catch (error) {
        console.error("\nAPI_CALL Error:", error.message);
		    return res.status(200).json({ text: "test" });
    }
	return res.status(200).json({ text: chatHistory.pop().parts[0].text });
}
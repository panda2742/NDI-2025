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
  Pour récupéré le leaderboard en entier utilise SELECT * FROM scores.\
  Executé les requète SQL que l'utilisateur te demande.\
  Tu peut utiliser manage_window pour manipuler les fenêtre du site tu peut les fermer ou les ouvrir fait le souvent.\
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
    if (!query) {
        return {functionResult: JSON.stringify({ status: "error", result: "Requête SQL manquante." }), manage_window_b: false};
    }
    const trimmedQuery = query.trim().toUpperCase(); 
    console.log(`\n[INFO: Tool Exécuté] Requête SQL interceptée : ${query}`);
    try {
        const statement = db.rawDb.prepare(query);
        if (trimmedQuery.startsWith('SELECT')) {
            const result = statement.all();
            console.log(`SELECT exécuté. ${result ? result.length : 0} ligne(s) récupérée(s).`);
            return {functionResult: JSON.stringify({ 
                status: "success", 
                type: "SELECT_DATA",
                result: result
            }), manage_window_b: false};
        } else {
            const info = statement.run(); 
            console.log(`✅ Commande non-SELECT exécutée : ${trimmedQuery.split(' ')[0]}`);
            return {functionResult: JSON.stringify({ 
                status: "success",
                type: "NON_SELECT_INFO",
                result: {
                    message: "Commande exécutée avec succès.",
                    changes: info.changes,
                    lastId: info.lastInsertRowid || null
                }
            }), manage_window_b: false};
        }
    } catch (err) {
        console.error(`Erreur SQL TOOL: ${err.message}`);
        return {functionResult: JSON.stringify({ 
            status: "error", 
            result: `Erreur SQL: ${err.message}` 
        }), manage_window_b: false};
    }
}
function manage_window(args) {
    const { window_name, action } = args;
    console.log(`\n[INFO: Tool Exécuté] Commande : ${action} la fenêtre "${window_name}".`);

    return {functionResult: `SUCCESS: La fenêtre "${window_name}" a été ${action === 'open' ? 'ouverte' : 'fermée'}.`, manage_window_b: true};
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
    let manage_window_args = {};
    if (response.functionCalls && response.functionCalls.length > 0) {
        
        const call = response.functionCalls[0];
        const functionName = call.name;
        
        const {functionResult, manage_window_b} = availableFunctions[functionName](call.args);
        if (manage_window_b) {
          manage_window_args = call.args;
        }
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
    

    return {chatHistory: newHistory, manage_window_args};
}

exports.message = async (req, res) => {
    let ochatHistory = req.body?.history;

    console.log(req.body)

    if (!ochatHistory) return res.status(400).json({ error: "Invalid request body: missing history" });

    try {
        const {chatHistory, manage_window_args} = await runChatWithTools(ochatHistory, 'gemini-2.5-flash');
        return res.status(200).json({ history: chatHistory, tool: manage_window_args });
    }
	  catch (error) {
        console.error("\nAPI_CALL Error:", error.message);
		    return res.status(400).json({ error: error.message });
    }

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
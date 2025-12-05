import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
// import { FileSystemFile, FileSystemParent } from "#/structure/FileSystem";
import { Command } from "../commands";

export const help: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
	const commands = [
        { cmd: "cat", desc: "Affiche le contenu d'un fichier" },
        { cmd: "ls", desc: "Liste les fichiers et dossiers du répertoire courant" },
        { cmd: "cd", desc: "Change le répertoire courant" },
        { cmd: "clear", desc: "Efface l'affichage du terminal" },
        { cmd: "exit", desc: "Ferme la session du terminal" },
        { cmd: "help", desc: "Affiche cette aide" },
        { cmd: "mkdir", desc: "Crée un nouveau dossier" },
        { cmd: "pwd", desc: "Affiche le chemin du répertoire courant" },
        { cmd: "touch", desc: "Crée un fichier vide ou met à jour son horodatage" },
    ];

    return {
        status: 0,
        content: [
            <div>Commandes disponibles :</div>,
            ...commands.map((c) => (
                <div key={c.cmd}>
                    <strong>{c.cmd}</strong> — {c.desc}
                </div>
            )),
        ],
    };
}

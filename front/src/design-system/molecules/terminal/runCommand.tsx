import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";

import { commands, TerminalResponse } from "./commands";

export function runCommand(command: string, fileSystem: FileSystemState, shell: ShellState): TerminalResponse {
	try {
		command = command.trim();
		const splittedCommand = command.split(" ");
		if (!command[0]) return { status: 0, action: "", content: [] };
		const theCommand = commands[splittedCommand[0]];
		if (!theCommand) return { status: 127, action: "", content: [<>zsh: command not found: {splittedCommand[0]}</>]}
		return theCommand(splittedCommand, fileSystem, shell);
	} catch (e) {
		if (!(e instanceof Error)) throw e;
		return {
			status: 1,
			content: [
				<>{e.message}</>
			]
		};
	}
}

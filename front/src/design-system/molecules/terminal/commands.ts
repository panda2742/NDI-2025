import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { cd } from "./commands/cd";
import { clear } from "./commands/clear";
import { exit } from "./commands/exit";
import { ls } from "./commands/ls";
import { mkdir } from "./commands/mkdir";
import { pwd } from "./commands/pwd";
import { snake } from "./commands/snake";

export type TerminalAction =
	| "clear"
	| "exit"
	| "snake"
	| ""

export interface TerminalResponse {
	action?: TerminalAction,
	content?: JSX.Element[],
	status: number
}

export type Command = (params: string[], fileSystem: FileSystemState, shell: ShellState) => TerminalResponse

export type CommandMap = Record<string, Command>;

export const commands: CommandMap = {
	exit,
	clear,
	mkdir,
	cd,
	ls,
	pwd,
	snake
}

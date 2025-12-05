import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { clear } from "./commands/clear";
import { exit } from "./commands/exit";
import { mkdir } from "./commands/mkdir";

export type TerminalAction =
	| "clear"
	| "exit"
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
	mkdir
}

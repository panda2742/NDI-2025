import { openApp } from "#/api/appController";
import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { Command } from "../commands";

export const snake: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
	openApp('snake');
	return { status: 0, content: [] };
}

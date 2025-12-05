import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { Command } from "../commands";

export const pwd: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
	return { status: 0, content: [<>{fileSystem.currentPath}</>] };
}

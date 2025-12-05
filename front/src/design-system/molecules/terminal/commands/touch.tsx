import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { FileSystemFile, FileSystemParent } from "#/structure/FileSystem";
import { Command } from "../commands";

export const touch: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
    const target = args[1];

	fileSystem.createFile(target, '');
	
    return { status: 0, content: [] };
}

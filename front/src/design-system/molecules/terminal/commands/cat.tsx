import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { FileSystemFile, FileSystemParent } from "#/structure/FileSystem";
import { Command } from "../commands";

export const cat: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
	let node: FileSystemParent | FileSystemFile;
	node = fileSystem.getPath(args[1]);
	if (!node.content)
		return { status: 1, content: [<>Its a folder !</>] }
	
	return { status: 0, content: [<>{node.content}</>] };
}

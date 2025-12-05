import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { FileSystemFile, FileSystemParent } from "#/structure/FileSystem";
import { Command } from "../commands";

export const ls: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
	let node: FileSystemParent | FileSystemFile;
	if (args.length < 2) {
		node = fileSystem.getPath(".");
	} else {
		node = fileSystem.getPath(args[1]);
	}
	if (node instanceof FileSystemFile) {
		return { status: 0, content: [<>{args[1]}</>] };
	}
	return { status: 0, content: [<>{node.children.join(" ")}</>] };
}

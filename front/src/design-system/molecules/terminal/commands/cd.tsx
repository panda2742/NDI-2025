import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { Command } from "../commands";

export const cd: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
	if (args.length < 2) {
		fileSystem.setCurrentPath("/home/miku");
	} else {
		fileSystem.setCurrentPath(args[1]);
	}
	return { status: 0, content: [] };
}

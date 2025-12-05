import { FileSystemState } from "#/store/fileSystem";
import { ShellState } from "#/store/shell";
import { Command } from "../commands";

export const mkdir: Command = (args: string[], fileSystem: FileSystemState, shell: ShellState) => {
	if (args.length > 1) {
		for (const path of args.slice(1)) {
			fileSystem.createDirectory(path);
		}
	} else {
		return {
			status: 1, content: [
				<>"mkdir: missing operand"</>,
				<>"Try 'mkdir --help' for more information."</>
			]
		};
	}
	return { status: 0, content: [] };
}

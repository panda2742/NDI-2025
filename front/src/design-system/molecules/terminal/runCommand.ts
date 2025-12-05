import { FileSystemState } from "#/store/fileSystem";

export interface TerminalResponse {
	action: "clear" | "exit" | "",
	content: string;
}

export function runCommand(command: string, fileSystem: FileSystemState): TerminalResponse {
	if (command === "exit")
		return { action: "exit", content: "" };
	else if (command === "clear")
		return { action: "clear", content: "" };
	return { action: "", content: "" };
}

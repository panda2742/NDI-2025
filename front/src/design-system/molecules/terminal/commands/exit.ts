import { Command } from "../commands";

export const exit: Command = () => {
	return { status: 0, action: "exit", content: [] };
}

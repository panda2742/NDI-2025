import { Command } from "../commands";

export const clear: Command = () => {
	return { status: 0, action: "clear", content: [] };
}

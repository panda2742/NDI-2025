import { useFileSystem } from "#/store/fileSystem"
import { useMemo } from "react";
import C from "./TerminalColors";

export default function Prompt() {
	const currentPath = useFileSystem((state) => state.currentPath);
	const splittedPath = currentPath.split("/")

	return useMemo(() => <span className="pre-command-text" >
		<C c="green" >
			<svg height="7" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.5 4H9.5M9.5 4L6.5 1M9.5 4L6.5 7" strokeWidth="2" strokeLinecap="round" />
			</svg>
		</C>
		<C c="cyan" style={{ "marginLeft": "5px" }}>{splittedPath[splittedPath.length - 1]}</C>
	</span>, []);
}

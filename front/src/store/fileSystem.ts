import { FileSystemDirectory, FileSystemFile, FileSystemNode, FileSystemParent, FileSystemRoot } from "#/structure/FileSystem";
import baseFileSystem from "@molecules/terminal/baseFileSystem";
import { create } from "zustand";

export type FileSystemState = {
	fs: FileSystemRoot,
	currentPath: string,
	createDirectory: (path: string) => void,
	createFile: (path: string, content?: string) => void,
	setCurrentPath: (path: string) => void,
	getPath: (path: string) => FileSystemParent | FileSystemFile
};

// function resolveSymLink(symlink: FileSystemSymLink, fs: FileSystemRoot, symlinkRecursion: number = 0) {
// 	let node = symlink;
// 	while (symlink instanceof resolveSymLink) {
// 		node = resolve
// 	}
// }

function toAbsolutePath(currentPath: string, path: string) {
	if (path[0] === '/') return path;
	const splittedCurrPath = currentPath.split("/");
	const splittedPath = path.split("/");
	for (const name of splittedPath) {
		if (!name || name === ".") continue;
		if (name === "..") {
			splittedCurrPath.pop();
			continue;
		}
		splittedCurrPath.push(name);
	}
	if (splittedCurrPath.length < 2)
		return "/";
	const test = splittedCurrPath.join("/");
	return test;
}

function resolvePath(path: string, fs: FileSystemRoot/*, symlinkRecursion: number = 0*/): FileSystemParent | FileSystemFile {
	const splittedPath = path.split("/").filter(Boolean);

	let directory: FileSystemNode = fs;
	for (const name of splittedPath) {
		if (!(directory instanceof FileSystemDirectory) && !(directory instanceof FileSystemRoot)) {
			throw new Error("File exists7");
		}
		// if (directory instanceof FileSystemSymLink) {
		// 	if (symlinkRecursion > 64) throw new Error("too many levels of symbolic links");
		// 	symlinkRecursion++;
		// 	directory = resolvePath(directory.targetPath, fs);
		// 	continue;
		// }
		const child = directory.find(name);
		if (!child) throw new Error("no such file or directory");
		directory = child;
	}
	return directory as FileSystemParent | FileSystemFile;
}

function createDirectory(path: string, fs: FileSystemRoot) {
	const splittedPath = path.split("/");
	const basename = splittedPath.pop();
	if (!basename) throw new Error("No entry");
	const parentDirectoryPath = splittedPath.join("/");
	const parentDirectory = resolvePath(parentDirectoryPath, fs);
	if (parentDirectory instanceof FileSystemFile) throw new Error("File exists4");
	if (parentDirectory.find(basename)) throw new Error("File exists5");
	parentDirectory.addDirectory(basename);
}

function createFile(path: string, fs: FileSystemRoot, content: string) {
	const splittedPath = path.split("/").filter(Boolean);
	const basename = splittedPath.pop();
	if (!basename) throw new Error("No entry");
	const parentDirectoryPath = splittedPath.join("/");
	const parentDirectory = resolvePath(parentDirectoryPath, fs);
	if (parentDirectory instanceof FileSystemFile) throw new Error("File exists2");
	if (parentDirectory.find(basename)) throw new Error("File exists3");
	parentDirectory.addFile(basename, content);
}

export const useFileSystem = create<FileSystemState>((set, get) => ({
	fs: baseFileSystem,
	currentPath: "/home/miku",
	createDirectory: (path: string) => set((state) => {
		createDirectory(toAbsolutePath(state.currentPath, path), state.fs);
		return { ...state };
	}),
	createFile: (path: string, content: string = "") => set((state) => {
		createFile(toAbsolutePath(state.currentPath, path), state.fs, content);
		return { ...state };
	}),
	setCurrentPath: (path: string) => set((state) => {
		const newPath = toAbsolutePath(state.currentPath, path);
		const directory = resolvePath(newPath, state.fs);
		return { ...state, currentPath: (directory instanceof FileSystemDirectory) ? newPath : state.currentPath };
	}),
	getPath: (path: string) => resolvePath(toAbsolutePath(get().currentPath, path), get().fs),
}));

import {
    FileSystemDirectory,
    FileSystemFile,
    FileSystemNode,
    FileSystemParent,
    FileSystemRoot,
} from "#/structure/FileSystem";
import baseFileSystem from "@molecules/terminal/baseFileSystem";
import { create } from "zustand";

export type FileSystemState = {
    fs: FileSystemRoot;
    currentPath: string;
    createDirectory: (path: string) => void;
    createFile: (path: string, content?: string) => void;
};

// function resolveSymLink(symlink: FileSystemSymLink, fs: FileSystemRoot, symlinkRecursion: number = 0) {
// 	let node = symlink;
// 	while (symlink instanceof resolveSymLink) {
// 		node = resolve
// 	}
// }

function resolvePath(
    path: string,
    fs: FileSystemRoot /*, symlinkRecursion: number = 0*/,
): FileSystemParent | FileSystemFile {
    const splittedPath = path.split("/").filter(Boolean);

    let directory: FileSystemNode = fs;
    for (const name of splittedPath) {
        if (!(directory instanceof FileSystemDirectory)) {
            throw new Error("File exists");
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
    const splittedPath = path.split("/").filter(Boolean);
    const basename = splittedPath.pop();
    if (!basename) throw new Error("No entry");
    const parentDirectoryPath = splittedPath.join("/");
    const parentDirectory = resolvePath(parentDirectoryPath, fs);
    if (parentDirectory instanceof FileSystemFile)
        throw new Error("File exists");
    if (parentDirectory.find(basename)) throw new Error("File exists");
    parentDirectory.addDirectory(basename);
}

function createFile(path: string, fs: FileSystemRoot, content: string) {
    const splittedPath = path.split("/").filter(Boolean);
    const basename = splittedPath.pop();
    if (!basename) throw new Error("No entry");
    const parentDirectoryPath = splittedPath.join("/");
    const parentDirectory = resolvePath(parentDirectoryPath, fs);
    if (parentDirectory instanceof FileSystemFile)
        throw new Error("File exists");
    if (parentDirectory.find(basename)) throw new Error("File exists");
    parentDirectory.addFile(basename, content);
}

export const useFileSystem = create<FileSystemState>((set) => ({
    fs: baseFileSystem,
    currentPath: "/home/user",
    createDirectory: (path: string) =>
        set((state) => {
            createDirectory(path, state.fs);
            return { ...state };
        }),
    createFile: (path: string, content: string = "") =>
        set((state) => {
            createFile(path, state.fs, content);
            return { ...state };
        }),
}));

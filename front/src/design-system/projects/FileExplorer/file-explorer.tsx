import { useState, useMemo } from "react";
import "./style.scss";
import { useFileSystem } from "#/store/fileSystem";
import {
    FileSystemDirectory,
    FileSystemFile,
    FileSystemNode,
    FileSystemParent,
} from "#/structure/FileSystem";

interface FileItem {
    name: string;
    type: "file" | "folder";
    size?: string;
    node: FileSystemNode;
}

export const FileExplorerProject = () => {
    const fileSystem = useFileSystem();
    const { fs } = fileSystem;
    const [currentPath, setCurrentPath] = useState("/");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [editingFile, setEditingFile] = useState<FileSystemFile | null>(null);
    const [editContent, setEditContent] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const validatePath = (path: string): boolean => {
        if (path.includes("..") && !path.endsWith("/..")) {
            return false;
        }

        if (path.includes("\0")) {
            return false;
        }

        if (path.length > 1000) {
            return false;
        }

        // eslint-disable-next-line no-control-regex
        const invalidChars = /[<>"|?*\x00-\x1f]/;
        if (invalidChars.test(path)) {
            return false;
        }

        return true;
    };

    const currentFiles = useMemo(() => {
        const resolvePath = (
            path: string,
        ): FileSystemParent | FileSystemFile => {
            if (!validatePath(path)) {
                throw new Error("Invalid path");
            }

            if (path === "/" || path === "") return fs;

            const splittedPath = path.split("/").filter(Boolean);
            let directory: FileSystemNode = fs;

            for (let i = 0; i < splittedPath.length; i++) {
                const name = splittedPath[i];
                if (
                    !(directory instanceof FileSystemDirectory) &&
                    directory !== fs
                ) {
                    throw new Error("Not a directory");
                }

                const parent = directory as FileSystemParent;
                const child = parent.find(name);
                if (!child) throw new Error("No such file or directory");
                directory = child;
            }
            return directory as FileSystemParent | FileSystemFile;
        };

        try {
            const currentNode = resolvePath(currentPath);
            if (currentNode instanceof FileSystemFile) return [];

            const items: FileItem[] = [];

            if (currentPath !== "/") {
                items.push({
                    name: "..",
                    type: "folder",
                    node: (currentNode as FileSystemDirectory).parent,
                });
            }

            (currentNode as FileSystemParent).children.forEach((child) => {
                const item: FileItem = {
                    name: child.name,
                    type: child instanceof FileSystemFile ? "file" : "folder",
                    node: child,
                };

                if (child instanceof FileSystemFile) {
                    const contentSize = new Blob([child.content]).size;
                    if (contentSize < 1024) {
                        item.size = `${contentSize} B`;
                    } else if (contentSize < 1024 * 1024) {
                        item.size = `${(contentSize / 1024).toFixed(1)} KB`;
                    } else {
                        item.size = `${(contentSize / (1024 * 1024)).toFixed(1)} MB`;
                    }
                }

                items.push(item);
            });
            return items;
        } catch {
            if (currentPath !== "/") setTimeout(() => setCurrentPath("/"), 0);
            try {
                const items: FileItem[] = [];
                fs.children.forEach((child) => {
                    items.push({
                        name: child.name,
                        type:
                            child instanceof FileSystemFile ? "file" : "folder",
                        node: child,
                    });
                });
                return items;
            } catch {
                return [];
            }
        }
    }, [currentPath, fs, refreshTrigger]);

    const handleItemClick = (item: FileItem) => {
        if (item.type === "folder") {
            if (item.name === "..") {
                const pathParts = currentPath.split("/").filter(Boolean);
                pathParts.pop();
                const newPath = "/" + pathParts.join("/") || "/";

                if (!validatePath(newPath)) {
                    return;
                }

                setCurrentPath(newPath);
            } else {
                const newPath =
                    currentPath === "/"
                        ? `/${item.name}`
                        : `${currentPath}/${item.name}`;

                if (!validatePath(newPath)) {
                    return;
                }

                try {
                    const testPath = newPath.split("/").filter(Boolean);
                    let testNode: FileSystemNode = fs;

                    for (const name of testPath) {
                        if (
                            !(testNode instanceof FileSystemDirectory) &&
                            testNode !== fs
                        ) {
                            return;
                        }
                        const child = (testNode as FileSystemParent).find(name);
                        if (!child) {
                            return;
                        }
                        testNode = child;
                    }

                    if (testNode instanceof FileSystemFile) {
                        return;
                    }

                    setCurrentPath(newPath);
                } catch {
                    return;
                }
            }
            setSelectedItem(null);
        } else {
            setSelectedItem(item.name);
        }
    };

    const handleItemDoubleClick = (item: FileItem) => {
        if (item.type === "folder") {
            handleItemClick(item);
        } else if (
            item.type === "file" &&
            item.node instanceof FileSystemFile
        ) {
            const fileNode = item.node as FileSystemFile;
            setEditingFile(fileNode);
            setEditContent(fileNode.content);
        }
    };

    const handleCloseEditor = () => {
        setEditingFile(null);
        setEditContent("");
    };

    const handleSaveFile = () => {
        if (editingFile) {
            editingFile.content = editContent;
            setRefreshTrigger((prev) => prev + 1);
            handleCloseEditor();
        }
    };

    const getFileIcon = (item: FileItem) => {
        if (item.type === "folder") {
            return item.name === ".." ? "↩" : ">";
        }
    };

    return (
        <div className="file-explorer-container">
            <div className="file-explorer-wrapper">
                <div className="file-explorer-header">
                    <div className="file-explorer-path">{currentPath}</div>
                </div>

                <div className="file-explorer-toolbar">
                    <div className="file-stats">
                        {currentFiles.filter((f) => f.name !== "..").length}{" "}
                        elements
                    </div>
                </div>

                <div className="file-explorer-content">
                    <div className="file-list-header">
                        <div className="file-column-name">Name</div>
                        <div className="file-column-size">Size</div>
                    </div>
                    <div className="file-list">
                        {currentFiles.map((item, index) => (
                            <div
                                key={`${item.name}-${index}`}
                                className={`file-item ${selectedItem === item.name ? "selected" : ""} ${item.type === "folder" ? "folder" : "file"}`}
                                onClick={() => handleItemClick(item)}
                                onDoubleClick={() =>
                                    handleItemDoubleClick(item)
                                }
                            >
                                <div className="file-item-name">
                                    <span className="file-icon">
                                        {getFileIcon(item)}
                                    </span>
                                    <span className="file-name">
                                        {item.name}
                                    </span>
                                </div>
                                <div className="file-item-size">
                                    {item.size || "—"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {editingFile && (
                <div
                    className="file-editor-overlay"
                    onClick={handleCloseEditor}
                >
                    <div
                        className="file-editor-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="file-editor-header">
                            <div className="file-editor-title">
                                {editingFile.name}
                            </div>
                            <button
                                className="file-editor-close"
                                onClick={handleCloseEditor}
                            >
                                X
                            </button>
                        </div>
                        <div className="file-editor-content">
                            <textarea
                                className="file-editor-textarea"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                spellCheck={false}
                                autoFocus
                            />
                        </div>
                        <div className="file-editor-footer">
                            <button
                                className="file-editor-button file-editor-cancel"
                                onClick={handleCloseEditor}
                            >
                                Cancel
                            </button>
                            <button
                                className="file-editor-button file-editor-save"
                                onClick={handleSaveFile}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

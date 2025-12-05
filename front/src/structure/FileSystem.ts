export abstract class FileSystemNode {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

interface FileSystemFileSchema {
    type: "file";
    name: string;
    content: string;
}

export class FileSystemParent extends FileSystemNode {
    children: Array<FileSystemNode>;

    constructor(name: string, children: Array<FileSystemNode> = []) {
        super(name);
        this.children = children;
    }

    find(name: string) {
        return this.children.find((child) => child.name === name);
    }

    addDirectory(name: string, children: Array<FileSystemNode> = []) {
        this.children.push(new FileSystemDirectory(name, this, children));
    }

    addFile(name: string, content: string = "") {
        this.children.push(new FileSystemFile(name, this, content));
    }
}

export class FileSystemFile extends FileSystemNode {
    parent: FileSystemParent;
    content: string;

    constructor(schema: FileSystemFileSchema, parent: FileSystemParent);
    constructor(name: string, parent: FileSystemParent, content?: string);
    constructor(
        arg0: string | FileSystemFileSchema,
        parent: FileSystemParent,
        content: string = "",
    ) {
        if (typeof arg0 === "string") {
            super(arg0);
            this.content = content;
        } else {
            super(arg0.name);
            this.content = arg0.content;
        }
        this.parent = parent;
    }
}

interface FileSystemDirectorySchema {
    type: "directory";
    name: string;
    children?: Array<FileSystemSchema>;
}

export class FileSystemDirectory extends FileSystemParent {
    parent: FileSystemParent;

    constructor(schema: FileSystemDirectorySchema, parent: FileSystemParent);
    constructor(
        name: string,
        parent: FileSystemParent,
        children?: Array<FileSystemNode>,
    );
    constructor(
        arg0: string | FileSystemDirectorySchema,
        parent: FileSystemParent,
        children: Array<FileSystemNode> = [],
    ) {
        if (typeof arg0 === "string") {
            super(arg0, children);
        } else {
            if (arg0.children) {
                super(arg0.name, []);
                this.children = arg0.children.map(
                    (childSchema: FileSystemSchema) =>
                        childSchema.type == "file"
                            ? new FileSystemFile(childSchema, this)
                            : new FileSystemDirectory(childSchema, this),
                );
            } else {
                super(arg0.name, children);
            }
        }
        this.parent = parent;
    }
}

export type FileSystemSchema = FileSystemDirectorySchema | FileSystemFileSchema;

export class FileSystemRoot extends FileSystemParent {
    children: Array<FileSystemNode>;

    constructor(schema: Array<FileSystemSchema> = []) {
        super("");
        this.children = schema.map((childSchema: FileSystemSchema) =>
            childSchema.type == "file"
                ? new FileSystemFile(childSchema, this)
                : new FileSystemDirectory(childSchema, this),
        );
    }
}

// export class FileSystemSymLink extends FileSystemNode {
// 	targetPath: string;
// 	parent: FileSystemParent;

// 	constructor(name: string, targetPath: string, parent: FileSystemParent) {
// 		super(name);
// 		this.targetPath = targetPath;
// 		this.parent = parent;
// 	}
// }

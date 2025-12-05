import { FileSystemRoot } from "#/structure/FileSystem";

const baseFileSystem: FileSystemRoot = new FileSystemRoot([
    {
        type: "directory",
        name: "home",
        children: [
            {
                type: "directory",
                name: "miku",
                children: [
                    {
                        type: "directory",
                        name: "Documents",
                        children: [
                            {
                                type: "directory",
                                name: "projects",
                                children: [
                                    {
                                        type: "file",
                                        name: "README.md",
                                        content:
                                            "Welcome to my projects directory!\nHere you can find all my work.",
                                    },
                                    {
                                        type: "directory",
                                        name: "ndi-2025",
                                        children: [
                                            {
                                                type: "directory",
                                                name: "frontend",
                                                children: [
                                                    {
                                                        type: "file",
                                                        name: "index.ts",
                                                        content:
                                                            'export const app = () => { console.log("Hello"); };',
                                                    },
                                                    {
                                                        type: "file",
                                                        name: "styles.css",
                                                        content:
                                                            "body { margin: 0; padding: 0; }",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "directory",
                                                name: "backend",
                                                children: [
                                                    {
                                                        type: "file",
                                                        name: "server.ts",
                                                        content:
                                                            'const express = require("express");\nconst app = express();\napp.listen(3000);',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "file",
                                name: "resume.txt",
                                content:
                                    "My Resume\n\nName: John Doe\nSkills: TypeScript, React, Node.js",
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default baseFileSystem;

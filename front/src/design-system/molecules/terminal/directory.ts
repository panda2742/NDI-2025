interface FileSystemNode {
    type: 'file' | 'directory';
    content?: string;
    children?: { [key: string]: FileSystemNode };
}

const fileSystem: FileSystemNode = {
    type: 'directory',
    children: {
        'home': {
            type: 'directory',
            children: {
                'projects': {
                    type: 'directory',
                    children: {
                        'README.md': {
                            type: 'file',
                            content: 'Welcome to my projects directory!\nHere you can find all my work.'
                        },
                        'ndi-2025': {
                            type: 'directory',
                            children: {
                                'frontend': {
                                    type: 'directory',
                                    children: {
                                        'index.ts': {
                                            type: 'file',
                                            content: 'export const app = () => { console.log("Hello"); };'
                                        },
                                        'styles.css': {
                                            type: 'file',
                                            content: 'body { margin: 0; padding: 0; }'
                                        }
                                    }
                                },
                                'backend': {
                                    type: 'directory',
                                    children: {
                                        'server.ts': {
                                            type: 'file',
                                            content: 'const express = require("express");\nconst app = express();\napp.listen(3000);'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                'documents': {
                    type: 'directory',
                    children: {
                        'resume.txt': {
                            type: 'file',
                            content: 'My Resume\n\nName: John Doe\nSkills: TypeScript, React, Node.js'
                        }
                    }
                }
            }
        },
        'opt': {
            type: 'directory',
            children: {
                'bin': {
                    type: 'directory',
                    children: {}
                }
            }
        }
    }
};

export default fileSystem;
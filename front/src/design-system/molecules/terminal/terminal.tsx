import './style.scss';
import {useState, KeyboardEvent, useRef, Fragment, PropsWithChildren, useEffect} from 'react';
import fileSystem from './directory';

export const Terminal = () => {
    const [lineNumber, setLineNumber] = useState(0);
    const [terminalContent, setTerminalContent] = useState<JSX.Element[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>(['home']);
    const currentPathRef = useRef<string[]>(currentPath);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const commandHistoryRef = useRef<string[]>(commandHistory);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const historyIndexRef = useRef<number | null>(historyIndex);
    const terminalRef = useRef<HTMLDivElement>(null);
    const lastInput = useRef<HTMLInputElement>(null);

    interface ColorInterface {
        c?: 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'cyan' | 'purple';
        b?: boolean;
    }

    const C = ({c = 'white', b = false, children}: PropsWithChildren<ColorInterface>) => {
        return <span className={`${c} ${b ? 'bold' : ''}`}>{children}</span>;
    };

    useEffect(() => {
        currentPathRef.current = currentPath;
    }, [currentPath])

    useEffect(() => {
        commandHistoryRef.current = commandHistory;
    }, [commandHistory])

    useEffect(() => {
        historyIndexRef.current = historyIndex;
    }, [historyIndex])

    const Line = ({children, gap = '0px'}: PropsWithChildren<{ gap?: string }>) => {
        return <div className='line' key={lineNumber}>
            <div className='pre-command-text' style={{gap}}>
                {children}
            </div>
            <input
                type='text'
                id={`input-command-${lineNumber}`}
                onKeyDown={handleKeyDown}
                ref={lastInput}
                autoComplete='off'
                autoFocus
            />
        </div>
    }

    const CommandOutput = ({children}: PropsWithChildren) => {
        return <div className='line command-out' key={`out-${lineNumber}`}>
            {children}
        </div>
    }

    const addTerminalContent = (content: JSX.Element) => {
        setTerminalContent((prev) => [...prev, content]);
    };

    const clearTerminalContent = () => {
        setTerminalContent([]);
        setLineNumber(0);

        // newLine();
        // setTimeout(() => initTerminal(), 0);
    };

    const newLine = () => {
        if (lastInput.current)
            lastInput.current.readOnly = true;

        console.log("currentPath: ", currentPath);
        addTerminalContent(
            <Line gap={'8px'}>
                <C c='green'>
                    <svg height="7" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 4H9.5M9.5 4L6.5 1M9.5 4L6.5 7" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </C>

                <C c='cyan' b={true}>{currentPathRef.current[currentPathRef.current.length - 1]}</C>
            </Line>
        );

        setLineNumber(prev => prev + 1);
    };

    type commandsList = {
        commandName: string;
        commandDesc: string;
        commandUsage: string;
        cb: (args: string[]) => JSX.Element | null;
    }[]

    const Li = ({c = 'white', children}: PropsWithChildren<ColorInterface>) => {
        return <div className='list-element'>
            <div className="list-element-style">
                <svg className={c} width="6" height="6" viewBox="0 0 4 4" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="1"/>
                </svg>
            </div>

            <div className="list-element-content">
                {children}
            </div>
        </div>
    }

    const getCurrentNode = () => {
        let node = fileSystem;
        for (const dir of currentPathRef.current) {
            if (node.type === 'directory' && node.children && node.children[dir]) {
                node = node.children[dir];
            } else {
                return null;
            }
        }
        return node;
    };

    const getNodeByPath = (path: string[]) => {
        let node = fileSystem;
        for (const dir of path) {
            if (node.type === 'directory' && node.children && node.children[dir]) {
                node = node.children[dir];
            } else {
                return null;
            }
        }
        return node;
    };

    const commandsList: commandsList = [
        {
            commandName: 'ls',
            commandUsage: 'ls',
            commandDesc: 'List files and directories in the current directory',
            cb: () => {
                const node = getCurrentNode();
                if (!node || node.type !== 'directory') {
                    return <C c='red'>Not a directory</C>;
                }

                if (!node.children || Object.keys(node.children).length === 0) {
                    return <C c='white'>Empty directory</C>;
                }

                return <div className='list'>
                    {Object.entries(node.children).map(([name, n], i) => (
                        <Li key={i}>
                            <C c={n.type === 'directory' ? 'blue' : 'white'}>
                                {name}{n.type === 'directory' ? '/' : ''}
                            </C>
                        </Li>
                    ))}
                </div>;
            }
        },
        {
            commandName: 'cd',
            commandUsage: 'cd <dir>',
            commandDesc: 'Move into <dir>, "cd .." to go back, "cd" to go to home',
            cb: (args) => {
                if (args.length === 0 || args[0] === '~') {
                    setCurrentPath(['home']);
                    return null;
                }

                if (['../', '..'].includes(args[0])) {
                    if (currentPathRef.current.length > 1) {
                        setCurrentPath(currentPathRef.current.slice(0, -1));
                    }
                    return null;
                }

                const newPath = [...currentPathRef.current, args[0]];
                const node = getNodeByPath(newPath);

                if (!node) {
                    return <C c='red'>cd: no such file or directory: {args[0]}</C>;
                }

                if (node.type !== 'directory') {
                    return <C c='red'>cd: not a directory: {args[0]}</C>;
                }
                
                setCurrentPath(newPath);
                return null;
            }
        },
        {
            commandName: 'cat',
            commandUsage: 'cat <file>',
            commandDesc: 'Display the content of <file>',
            cb: (args) => {
                if (args.length === 0) {
                    return <C c='red'>cat: missing file name</C>;
                }

                const newPath = [...currentPathRef.current, args[0]];
                const node = getNodeByPath(newPath);

                if (!node) {
                    return <C c='red'>cat: {args[0]}: No such file or directory</C>;
                }

                if (node.type !== 'file') {
                    return <C c='red'>cat: {args[0]}: Is a directory</C>;
                }

                return <C c='green'>{node.content || ''}</C>;
            }
        },
        {
            commandName: 'pwd',
            commandUsage: 'pwd',
            commandDesc: 'Print working directory',
            cb: () => {
                return <C c='cyan'>/{currentPathRef.current.join('/')}</C>;
            }
        },
        {
            commandName: 'clear',
            commandUsage: 'clear',
            commandDesc: 'Clear the screen',
            cb: () => {
                clearTerminalContent();
                return null;
            }
        },
        {
            commandName: 'help',
            commandUsage: 'help',
            commandDesc: 'Display this help menu',
            cb: () => {
                return <div className='list'>
                    {commandsList.map((command, i) =>
                        <Li key={i}><C c='red'>{command.commandUsage}</C> <C c='white'> - {command.commandDesc}</C></Li>
                    )}
                </div>;
            }
        }
    ];
    const commandManager = (value: string | undefined) => {
        if (!value) return;
        
        const args = value.trim().split(/\s+/);
        const commandName = args.shift();

        const command = commandsList.find(command => command.commandName?.toLowerCase() === commandName?.toLowerCase());
        if (!command) {
            addTerminalContent(<CommandOutput><C c='red'>zsh: command not found: {commandName}</C></CommandOutput>);
            return;
        }

        const returnCommand = command.cb(args);
        if (returnCommand)
            addTerminalContent(<CommandOutput>{returnCommand}</CommandOutput>);

        setCommandHistory(prev => [...prev, value]);
        setHistoryIndex(null);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            commandManager(lastInput.current?.value);
            setTimeout(() => {
                newLine();
            }, 0);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            const newIndex = historyIndexRef.current === null ? commandHistoryRef.current.length - 1 : Math.max(0, historyIndexRef.current - 1);
            setHistoryIndex(newIndex);
            if (lastInput.current) {
                lastInput.current.value = commandHistoryRef.current[newIndex] || '';
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (historyIndexRef.current === null) return;
            const newIndex = historyIndexRef.current + 1;
            if (newIndex >= commandHistoryRef.current.length) {
                setHistoryIndex(null);
                if (lastInput.current) lastInput.current.value = '';
            } else {
                setHistoryIndex(newIndex);
                if (lastInput.current) lastInput.current.value = commandHistoryRef.current[newIndex];
            }
        }
    };


    const initTerminal = () => {
        // lastInput.current = null;
        addTerminalContent(
            <div className={'line'}>
                <C c={"green"}>ヽ(ˋ▽ˊ)ノ</C><C>: Hey, you found the terminal! Type `help` to get started.</C>
            </div>)

        // newLine();
    }

    const handleClick = () => {
        console.log('⬅️ Focus Input');
        if (lastInput.current)
            lastInput.current.focus()
    };

    const initRef = useRef(false);

    useEffect(() => {
        if (initRef.current) return

        initTerminal();
        newLine()

        initRef.current = true;
    }, []);

    return (
        <div className="terminal terminal-app" id="terminal" onClick={handleClick}>
            <div className="terminal-content" id="terminal-content" ref={terminalRef}>
                {terminalContent.map((content, index) => (
                    <Fragment key={index}>{content}</Fragment>
                ))}
            </div>
        </div>
    );
};

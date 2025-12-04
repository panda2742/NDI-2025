import './style.scss';
import {useState, KeyboardEvent, useRef, Fragment, PropsWithChildren, useEffect} from 'react';

export const Terminal = () => {
    const [lineNumber, setLineNumber] = useState(0);
    const [terminalContent, setTerminalContent] = useState<JSX.Element[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);
    const lastInput = useRef<HTMLInputElement>(null);

    interface ColorInterface {
        c?: 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'cyan' | 'purple';
        b?: boolean;
    }

    const C = ({c = 'white', b = false, children}: PropsWithChildren<ColorInterface>) => {
        return <span className={`${c} ${b ? 'bold' : ''}`}>{children}</span>;
    };

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

        setTimeout(() => initTerminal(), 0);
    };

    const newLine = () => {
        if (lastInput.current)
            lastInput.current.readOnly = true;


        addTerminalContent(
            <Line gap={'8px'}>
                <C c='green'>
                    <svg height="7" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 4H9.5M9.5 4L6.5 1M9.5 4L6.5 7" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </C>

                <C c='cyan' b={true}>Projects</C>
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

    const commandsList: commandsList = [
        {
            commandName: 'cat',
            commandUsage: 'cat <file>',
            commandDesc: 'See the content of <file>',
            cb: () => {


                return null;
            },
        },
        {
            commandName: 'cd',
            commandUsage: 'cd <dir>',
            commandDesc: 'Move into <dir>, "cd .." to move to the parent directory, "cd" or "cd ~" to return to root',
            cb: () => {


                return null;
            },
        },
        {
            commandName: 'ls',
            commandUsage: 'ls',
            commandDesc: 'See files and directories in the current directory',
            cb: () => {


                return null;
            },
        },
        {
            commandName: 'clear',
            commandUsage: 'clear',
            commandDesc: 'Clear the screen',
            cb: () => {
                clearTerminalContent()

                return null;
            }
        },
        {
            commandName: 'help',
            commandUsage: 'help',
            commandDesc: 'Display this help menu',
            cb: () => {
                return <div className={'list'}>
                    {commandsList.map((command, i) =>
                        <Li key={i}><C c='red'>{command.commandUsage}</C> <C c='white'> - {command.commandDesc}</C></Li>)}

                    <Li><C>press </C><C c='red'>up arrow / down arrow</C><C>{' - Select history commands'}</C></Li>
                    <Li><C>press </C><C c='red'>tab</C><C>{' - Auto complete'}</C></Li>
                </div>


            }
        }
    ]

    const commandManager = (value: string | undefined) => {
        if (!value) return;
        const args = value.split(' ');
        const commandName = args.shift();

        const command = commandsList.find(command => command.commandName?.toLowerCase() === commandName?.toLowerCase());
        if (!command) {
            addTerminalContent(<CommandOutput><C>zsh: command not found: {commandName}</C></CommandOutput>)

            return;
        }

        const returnCommand = command.cb(args)
        if (returnCommand)
            addTerminalContent(<CommandOutput>{returnCommand}</CommandOutput>)


    }


    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log('↩️ New Line');

            commandManager(lastInput.current?.value);

            setTimeout(() => {
                newLine()
            }, 0);
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

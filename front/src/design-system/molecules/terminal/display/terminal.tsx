import { closeApp } from '#/api/appController';
import { useFileSystem } from '#/store/fileSystem';
import { useShell } from '#/store/shell';
import { runCommand } from '../runCommand';
import Line from './Line';
import Prompt from './Prompt';
import './style.scss';
import { useState, KeyboardEvent, useRef, Fragment, useEffect } from 'react';


export function Terminal() {
    const shell = useShell((state) => state);
    const fileSystem = useFileSystem((state) => state);

    const [command, setCommand] = useState("");
    const [terminalContentHistory, setTerminalContentHistory] = useState<ReturnType<typeof Line>[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const commandRef = useRef<string>(command);
    const terminalContentHistoryRef = useRef<ReturnType<typeof Line>[]>(terminalContentHistory);
    const commandHistoryRef = useRef<string[]>(commandHistory);
    const historyIndexRef = useRef<number | null>(historyIndex);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        commandRef.current = command;
    }, [command]);

    useEffect(() => {
        terminalContentHistoryRef.current = terminalContentHistory;
    }, [terminalContentHistory]);

    useEffect(() => {
        commandHistoryRef.current = commandHistory;
    }, [commandHistory]);

    useEffect(() => {
        historyIndexRef.current = historyIndex;
    }, [historyIndex]);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.scrollIntoView();
    }, [])

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const output = runCommand(command, fileSystem, shell);
            const newContentHistory = output.content ?? [];
            if (!newContentHistory[newContentHistory.length - 1])
                newContentHistory.pop();
            setTerminalContentHistory([...terminalContentHistoryRef.current, <Line><Prompt path={fileSystem.currentPath}/><span>{command}</span></Line>, ...(newContentHistory.map((txt) => <Line>{txt}</Line>))]);
            setCommand("");
            setCommandHistory([...commandHistoryRef.current, command]);
            setHistoryIndex(null);
            if (output.action === "exit") {
                setTerminalContentHistory([]);
                setTerminalContentHistory([]);
                closeApp("terminal");
            } else if (output.action === "clear") {
                setTerminalContentHistory([]);
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            const newIndex = historyIndexRef.current === null ? commandHistoryRef.current.length - 1 : Math.max(0, historyIndexRef.current - 1);
            setHistoryIndex(newIndex);
            setCommand(commandHistoryRef.current[newIndex] || '');
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (historyIndexRef.current === null) return;
            const newIndex = historyIndexRef.current + 1;
            if (newIndex >= commandHistoryRef.current.length) {
                setHistoryIndex(null);
                setCommand("");
            } else {
                setHistoryIndex(newIndex);
                setCommand(commandHistoryRef.current[newIndex]);
            }
            setCommand(commandHistoryRef.current[newIndex] || '');
        } else if (event.key === "Tab") {
            event.preventDefault();
        }
    };


    // const initTerminal = () => {
    //     addTerminalContent(
    //         <div className={'line'}>
    //             <C c={"green"}>ヽ(ˋ▽ˊ)ノ</C><C>: Hey, you found the terminal! Type `help` to get started.</C>
    //         </div>)
    // }

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            // scroll to the last input when clicking the terminal
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };


    // useEffect(() => {
    //     if (initRef.current) return

    //     initTerminal();
    //     newLine()

    //     initRef.current = true;
    // }, []);

    // Scroll to the last input whenever terminal content changes
    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [terminalContentHistory]);

    return (
        <div className="terminal terminal-app" id="terminal" onClick={handleClick}>
            <div className="terminal-content" id="terminal-content" >
                {terminalContentHistory.map((line, index) => <Fragment key={index}>{line}</Fragment>)}
                <Line><Prompt /><input type='text' onKeyDown={handleKeyDown} value={command} onChange={(e) => setCommand(e.target.value)} ref={inputRef} /></Line>
            </div>
        </div>
    );
}

import Line from './Line';
import './style.scss';
import { useState, KeyboardEvent, useRef, Fragment, PropsWithChildren, useEffect } from 'react';


export function Terminal() {
    // const [terminalContentHistory, setTerminalContentHistory] = useState<ReturnType<typeof Line>[]>([]);
    // const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    // const historyIndexRef = useRef<number | null>(historyIndex);
    // const terminalRef = useRef<HTMLDivElement>(null);
    // const lastInput = useRef<HTMLInputElement>(null);

    // interface ColorInterface {
    //     c?: 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'cyan' | 'purple';
    //     b?: boolean;
    // }

    // const C = ({ c = 'white', b = false, children }: PropsWithChildren<ColorInterface>) => {
    //     return <span className={`${c} ${b ? 'bold' : ''}`}>{children}</span>;
    // };

    // useEffect(() => {
    //     historyIndexRef.current = historyIndex;
    // }, [historyIndex])

    // const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") {
    //         commandManager(lastInput.current?.value);
    //         setTimeout(() => {
    //             newLine();
    //         }, 0);
    //     } else if (event.key === "ArrowUp") {
    //         event.preventDefault();
    //         const newIndex = historyIndexRef.current === null ? commandHistoryRef.current.length - 1 : Math.max(0, historyIndexRef.current - 1);
    //         setHistoryIndex(newIndex);
    //         if (lastInput.current) {
    //             lastInput.current.value = commandHistoryRef.current[newIndex] || '';
    //         }
    //     } else if (event.key === "ArrowDown") {
    //         event.preventDefault();
    //         if (historyIndexRef.current === null) return;
    //         const newIndex = historyIndexRef.current + 1;
    //         if (newIndex >= commandHistoryRef.current.length) {
    //             setHistoryIndex(null);
    //             if (lastInput.current) lastInput.current.value = '';
    //         } else {
    //             setHistoryIndex(newIndex);
    //             if (lastInput.current) lastInput.current.value = commandHistoryRef.current[newIndex];
    //         }
    //     }
    // };


    // const initTerminal = () => {
    //     addTerminalContent(
    //         <div className={'line'}>
    //             <C c={"green"}>ヽ(ˋ▽ˊ)ノ</C><C>: Hey, you found the terminal! Type `help` to get started.</C>
    //         </div>)
    // }

    // const handleClick = () => {
    //     console.log('⬅️ Focus Input');
    //     if (lastInput.current)
    //         lastInput.current.focus()
    // };

    // const initRef = useRef(false);

    // useEffect(() => {
    //     if (initRef.current) return

    //     initTerminal();
    //     newLine()

    //     initRef.current = true;
    // }, []);

    // return (
    //     <div className="terminal terminal-app" id="terminal" onClick={handleClick}>
    //         <div className="terminal-content" id="terminal-content" ref={terminalRef}>
    //             {terminalContentHistory.map((content, index) => (
    //                 <Fragment key={index}>{content}</Fragment>
    //             ))}
    //             <Line></Line>
    //         </div>
    //     </div>
    // );
    return null;
}

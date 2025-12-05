import { useState, useEffect } from "react";
import "./style.scss";

export const CalculatorProject = () => {
    const [display, setDisplay] = useState("0");
    const [previousValue, setPreviousValue] = useState<string | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

    const buttons = [
        "7",
        "8",
        "9",
        "÷",
        "4",
        "5",
        "6",
        "×",
        "1",
        "2",
        "3",
        "-",
        "0",
        ".",
        "=",
        "+",
    ];

    const [buttonOrder, setButtonOrder] = useState(buttons);

    const shuffleButtons = () => {
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
        const operators = ["÷", "×", "-", "+", "="];

        const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);

        const shuffledOperators = [...operators].sort(
            () => Math.random() - 0.5,
        );
        const newOrder: string[] = [];
        let numIndex = 0;
        let opIndex = 0;

        for (let i = 0; i < 16; i++) {
            if ((i + 1) % 4 === 0 && opIndex < shuffledOperators.length) {
                newOrder.push(shuffledOperators[opIndex]);
                opIndex++;
            } else {
                newOrder.push(shuffledNumbers[numIndex]);
                numIndex++;
            }
        }

        setButtonOrder(newOrder);
    };

    const handleNumberClick = (num: string) => {
        shuffleButtons();

        if (shouldResetDisplay) {
            setDisplay(num);
            setShouldResetDisplay(false);
        } else {
            setDisplay(display === "0" ? num : display + num);
        }
    };

    const handleOperationClick = (op: string) => {
        shuffleButtons();

        if (op === "=") {
            if (operation && previousValue !== null) {
                const prev = parseFloat(previousValue);
                const current = parseFloat(display);
                let result = 0;

                switch (operation) {
                    case "+":
                        result = prev + current;
                        break;
                    case "-":
                        result = prev - current;
                        break;
                    case "×":
                        result = prev * current;
                        break;
                    case "÷":
                        result = prev / current;
                        break;
                }

                setDisplay(result.toString());
                setPreviousValue(null);
                setOperation(null);
                setShouldResetDisplay(true);
            }
        } else {
            if (operation && previousValue !== null && !shouldResetDisplay) {
                const prev = parseFloat(previousValue);
                const current = parseFloat(display);
                let result = 0;

                switch (operation) {
                    case "+":
                        result = prev + current;
                        break;
                    case "-":
                        result = prev - current;
                        break;
                    case "×":
                        result = prev * current;
                        break;
                    case "÷":
                        result = prev / current;
                        break;
                }

                setPreviousValue(result.toString());
                setDisplay(result.toString());
            } else {
                setPreviousValue(display);
            }

            setOperation(op);
            setShouldResetDisplay(true);
        }
    };

    const handleButtonClick = (btn: string) => {
        if (btn === "." && display.includes(".")) return;

        if (["+", "-", "×", "÷", "="].includes(btn)) {
            handleOperationClick(btn);
        } else {
            handleNumberClick(btn);
        }
    };

    useEffect(() => {
        shuffleButtons();
    }, []);

    return (
        <div className="calculator-container">
            <div className="calculator-wrapper">
                <div className="calculator-display">
                    <div className="calculator-operation">
                        {previousValue && operation
                            ? `${previousValue} ${operation}`
                            : ""}
                    </div>
                    <div className="calculator-current">{display}</div>
                </div>

                <div className="calculator-buttons">
                    {buttonOrder.map((btn, index) => (
                        <button
                            key={`${btn}-${index}`}
                            className={`calculator-button ${
                                ["+", "-", "×", "÷", "="].includes(btn)
                                    ? "calculator-button-operator"
                                    : ""
                            } ${btn === "=" ? "calculator-button-equals" : ""}`}
                            onClick={() => handleButtonClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

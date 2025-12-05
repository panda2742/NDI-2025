import { useState, useEffect } from 'react'

function TextBox({inputText, valid, validText, setValidText}) {
  const [text, setText] = useState("");
  const [isVisualKeyboardOpen, setIsVisualKeyboardOpen] = useState(false);
  const [isVisualKeyboardDisable, setIsVisualKeyboardDisable] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  const addChar = (char) => {
    setText(text + char);
    if (!valid(text))
      setValidText(0);
    else
      setValidText(1);
  };

  const delChar = () => {
    setText(text.slice(0, -1));
    if (!valid(text))
      setValidText(0);
    else
      setValidText(1);
  };

  const submitInput = () => {
    if (validText) {
      if (!isVisualKeyboardDisable) {
        setButtonPos({
          x: 0,
          y: 0
        });
        setIsVisualKeyboardDisable(true);
      } else {
        setText("");
        setIsVisualKeyboardDisable(false);
      }
    }
  };

  const resetLoc = () => {
      setButtonPos({
        x: 0,
        y: 0
      })
  };

  const handleMouseMove = (e) => {
    const button = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;

    const distance = Math.sqrt(
      Math.pow(mouseX - buttonCenterX, 2) +
      Math.pow(mouseY - buttonCenterY, 2)
    );

    if (distance < 200) {
      const angle = Math.atan2(mouseY - buttonCenterY, mouseX - buttonCenterX);
      const moveDistance = 20;

      const maxX = window.innerWidth - button.width - 50;
      const maxY = window.innerHeight - button.height - 50;
      const minX = -button.left + 50;
      const minY = -button.top + 50;

      setButtonPos({
        x: Math.max(minX, Math.min(buttonPos.x - Math.cos(angle) * moveDistance, maxX)),
        y: Math.max(minY, Math.min(buttonPos.y - Math.sin(angle) * moveDistance, maxY))
      });
    }
  };

  function randomString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }


  function Clavier() {
    const keys = randomString('qazwsxedcrfvtgbyhnujmikolpAZERTYUIOPQSDFGHJKLMWXCVBN0123456789-_.@/');
    const keysArray = keys.split('');
    const lines = [];

    for (let i = 0; i < keysArray.length; i += 15) {
      lines.push(keysArray.slice(i, i + 15));
    }

    return (
      <div>
        {lines.map((line, indexline) => (
          <div key={indexline} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
            {line.map((char) => (
              <button key={char == '/' ? "delete" : char} onMouseDown={() => char == '/' ? delChar() : addChar(char)}>
                {char == '/' ? 'DEL' : char}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }


  return (
    <div>
      <div>
        <h5>{inputText}</h5>
        <div onFocus={() => { setIsVisualKeyboardOpen(true) }} onBlur={() => { setIsVisualKeyboardOpen(false) }}>

          <input value={text} disabled={isVisualKeyboardDisable}/>

          {isVisualKeyboardOpen &&
            <div>
              <Clavier />
            </div>
          }
        </div>
        <button onClick={() => submitInput()} onMouseMove={handleMouseMove}
          style={{
            position: 'relative',
            transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
            transition: 'transform 0.1s ease'
          }}>
          {validText ? (isVisualKeyboardDisable ? "Submited !" : "Submit ?") : "Invalid !"}
        </button>
        <button onClick={() => resetLoc()}>
          Reset
        </button>
      </div>
    </div>
  )
}

function Slide1({ setValid }) {

  const [validText1, setValidText1] = useState(0);
  const [validText2, setValidText2] = useState(0);
  const [validText3, setValidText3] = useState(0);

  useEffect(() => {
    if (validText1 === 1 && validText2 === 1 && validText3 === 1)
      setValid(1);
    else
      setValid(0);
  }, [validText1, validText2, validText3]);

  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function nameIsValid (text) {
    return /^[A-Z][a-z]+(?:[-\s][A-Z][a-z]+)*$/.test(text)
  }

  return (
    <div>
      <TextBox inputText="Name" valid={nameIsValid} validText={validText1} setValidText={setValidText1}/>
      <TextBox inputText="First Name" valid={nameIsValid} validText={validText2} setValidText={setValidText2}/>
      <TextBox inputText="Email" valid={emailIsValid} validText={validText3} setValidText={setValidText3}/>
    </div>
  )
}

export default Slide1


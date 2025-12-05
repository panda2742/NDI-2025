import { useState, useRef, useEffect } from 'react'

function TextBox({inputText, valid, validText, setValidText}) {

  function onChange(text) {
    setValidText(text);
  }

  return (
    <div>
      <h5>{inputText}</h5>
      <input 
        disabled={valid}
        type={"password"}
        value={validText}
        onChange={(e) => onChange(e.target.value)}
        onPaste={(e) => {e.preventDefault()}}
        onCopy={(e) => {e.preventDefault()}}
        onCut={(e) => {e.preventDefault()}}
      />
    </div>
  );
}

function Slide2({ setValid }) {
  const [validText1, setValidText1] = useState("");
  const [validText2, setValidText2] = useState("");
  const [dist, setDistance] = useState(0);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const randomX = Math.random() * (Math.min(100, window.innerWidth - 100));
    const randomY = Math.random() * (Math.min(100, window.innerHeight - 200));
    setButtonPos({ x: randomX, y: randomY });
  }, []);

  function onClickMouse(){
    tryValid();
    if (!(validText1 === validText2 && passwordIsValid(validText1)))
    {
      setValidText1("");
      setValidText2("");
    const randomX = Math.random() * (Math.min(100, window.innerWidth - 100));
    const randomY = Math.random() * (Math.min(100, window.innerHeight - 200));
      setButtonPos({ x: randomX, y: randomY });
    }
  }

  function tryValid() {
    if (validText1 === validText2 && passwordIsValid(validText1))
      setValid(1);
    else
      setValid(0);
  }
  
  function passwordIsValid(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dist = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + 
          Math.pow(mouseY - centerY, 2)
        );
        setDistance(dist);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div>
      <h5>Submit button: {Math.round(dist)}</h5>
      <TextBox inputText="Password (8 char min, at least 1 upper case, a number and a special character)" valid={validText1 === validText2 && passwordIsValid(validText1)} validText={validText1} setValidText={setValidText1}/>
      <TextBox inputText="Confirm Password" valid={validText1 === validText2 && passwordIsValid(validText1)} validText={validText2} setValidText={setValidText2}/>
      <button 
        ref={buttonRef}
        onClick={onClickMouse} 
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          position: 'absolute',
          outline: 'none',
          boxShadow: 'none',
          left: `${buttonPos.x}px`,
          top: `${buttonPos.y}px`,
        }}
      >
      </button>
    </div>
  );
}

export default Slide2
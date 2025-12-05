import { useState, useEffect } from 'react'
import Slide1 from './Slide1.jsx'
import Slide2 from './Slide2.jsx'
import Slide3 from './Slide3.jsx'
import { closeApp } from '#/api/appController';
import LanguageSelector from './LanguageSelector.jsx';

function Slides() {
  const [slideNumber, setslideNumber] = useState(0);
  const [slideValid, setslideValid] = useState(0);
  const slides = [<Slide1 setValid={setslideValid}/>, <Slide2 setValid={setslideValid}/>, <Slide3 setValid={setslideValid}/>];
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const elements = document.querySelectorAll('input, button');
        const randomIndex = Math.floor(Math.random() * elements.length);
        elements[randomIndex].focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (slideNumber === 3) {
      setTimeout(() => {setslideNumber(0); closeApp("windous")}, 5000);
    }
  }, [slideNumber]);

  return (
    <div>
    <div style={{display: slideNumber === 3 ? 'none': 'block'}}>
    <LanguageSelector />
      {slides[slideNumber]}
      <button onClick={() => { setslideNumber(0); setslideValid(0); }}>Prev</button>
      <button disabled = {!slideValid} onClick={() => { setslideNumber(slideNumber + 1); setslideValid(0); }}>Next</button>
    </div>
    <div className="errorScreen" style={{display: slideNumber === 3 ? 'flex': 'none'}}>
      <img src="/blueScreen.png" alt="Description de l’image" width="600" height="400"></img>
    </div>
    </div>
  );
}

export default Slides


import { useState, useEffect } from 'react'

function TextBox({ inputText, setValidText }) {
  const [text, setText] = useState("");
  const [value, setValue] = useState(0);

  const chars = 'qazwsxedcrfvtgbyhnujmikolpAZERTYUIOPQSDFGHJKLMWXCVBN-_.@/';

  const addInput = () => {
    if (value === chars.length - 1) {
      // Dernier caractère choisi → supprime le dernier caractère
      setText((prev) => prev.slice(0, -1));
      setValidText((prev) => prev.slice(0, -1));
    } else {
      setText((prev) => prev + chars[value]);
      setValidText((prev) => prev + chars[value]);
    }
  };

  const incrementValue = () => setValue((prev) => Math.min(chars.length - 1, prev + 1));
  const decrementValue = () => setValue((prev) => Math.max(0, prev - 1));

  return (
    <div>
      <h5>{inputText}</h5>
      <div>
        <input
          value={text}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <h5>{value}</h5>
        <button onClick={addInput}>Add</button>
        <button onClick={incrementValue}>+</button>
        <button onClick={decrementValue}>-</button>
      </div>
    </div>
  );
}

function Slide3({ setValid }) {

  const [validText1, setValidText1] = useState(0);
  const [validText2, setValidText2] = useState(0);
  const [validText3, setValidText3] = useState(0); 
  const [validText4, setValidText4] = useState(0);
  const [validText5, setValidText5] = useState(0);
  const [validText6, setValidText6] = useState("");

  function clickedButton(){
    if (validText6 !== ""){
    alert("We saw that your Fatherś father: " + validText6 + " don´t exists in our database. You should create him a account");
    setValid(1);
    }
  }

  return (
    <div>
    <h4>qazwsxedcrfvtgbyhnujmikolpAZERTYUIOPQSDFGHJKLMWXCVBN-_.@"del"</h4>
    <TextBox inputText="Mother Name" setValidText={setValidText1}/>
    <TextBox inputText="Father Name" setValidText={setValidText2}/>
    <TextBox inputText="Mother Mother Name" setValidText={setValidText3}/>
    <TextBox inputText="Mother Father Name" setValidText={setValidText4}/>
    <TextBox inputText="Mother Father Name" setValidText={setValidText5}/>
    <TextBox inputText="Father Father Name" setValidText={setValidText6}/>
    <button onClick={clickedButton}>Submit</button>
    </div>
  )
}

export default Slide3
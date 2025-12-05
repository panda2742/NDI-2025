import { useState } from 'react'

function TextBox({ inputText, setValidText }: { inputText: string, setValidText: React.Dispatch<React.SetStateAction<string>> }) {
  const [text, setText] = useState("");
  const [value, setValue] = useState(0);

  const chars = 'qazwsxedcrfvtgbyhnujmikolpAZERTYUIOPQSDFGHJKLMWXCVBN-_.@/';

  const addInput = () => {
    if (value === chars.length - 1) {
      setText((prev) => prev.slice(0, -1));
      setValidText((prev: string) => prev.slice(0, -1));
    }
    else {
      setText((prev) => prev + chars[value]);
      setValidText((prev: string) => prev + chars[value]);
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

      <div>
        <h5>{value}</h5>
        <button onClick={addInput}>Add</button>
        <button onClick={incrementValue}>+</button>
        <button onClick={decrementValue}>-</button>
      </div>
    </div>
  );
}

function Slide3({ setValid }: {setValid: React.Dispatch<React.SetStateAction<number>>}) {

  const setValidText1 = useState("")[1];
  const setValidText2 = useState("")[1];
  const setValidText3 = useState("")[1];
  const setValidText4 = useState("")[1];
  const setValidText5 = useState("")[1];
  const [validText6, setValidText6] = useState("");

  function clickedButton() {
    if (validText6 !== "") {
      alert("We saw that your Fatherś father: " + validText6 + " don´t exists in our database. You should create him a account");
      setValid(1);
    }
  }

  return (
    <div>
      <h4>qazwsxedcrfvtgbyhnujmikolpAZERTYUIOPQSDFGHJKLMWXCVBN-_.@"del"</h4>
      <TextBox inputText="Mother Name" setValidText={setValidText1} />
      <TextBox inputText="Father Name" setValidText={setValidText2} />
      <TextBox inputText="Mother's Mother Name" setValidText={setValidText3} />
      <TextBox inputText="Mother's Father Name" setValidText={setValidText4} />
      <TextBox inputText="Father's Mother Name" setValidText={setValidText5} />
      <TextBox inputText="Father's Father Name" setValidText={setValidText6} />
      <button onClick={clickedButton}>Submit</button>
    </div>
  )
}

export default Slide3
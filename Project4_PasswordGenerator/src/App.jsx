import { TbCopy } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [range, setRange] = useState(5);
  const [password, setPassword] = useState("Pass$");
  const [upperSelected, setUpperSelected] = useState(false);
  const [lowerSelected, setLowerSelected] = useState(false);
  const [numberSelected, setNumberSelected] = useState(false);
  const [symbolSelected, setSymbolSelected] = useState(false);
  const [strengthSelected, setStrengthSelected] = useState("VERY WEAK");
  const [strengthColor, setStrengthColor] = useState("bg-red-700");
  const [copyCheck, setCopyCheck] = useState(false);

  useEffect(() => {
    const { color, text } = strengthCheck();
    if (text !== strengthSelected) {
      setStrengthSelected(text);
    }

    if (color !== strengthColor) {
      setStrengthColor(color);
    }
  }, [password, upperSelected, lowerSelected, numberSelected, symbolSelected]);

  const lowerCase = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const upperCase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const symbols = ["!", "@", "#", "$", "&", "*", "?"];

  const HandleChange = (e) => {
    setRange(e.target.value);
    let totalRandom = "";
    let charSet = [];

    if (lowerSelected) {
      charSet = [...charSet, ...lowerCase];
    }

    if (upperSelected) {
      charSet = [...charSet, ...upperCase];
    }

    if (numberSelected) {
      charSet = [...charSet, ...numbers];
    }

    if (symbolSelected) {
      charSet = [...charSet, ...symbols];
    }

    if (charSet.length === 0) {
      charSet = lowerCase;
    }

    for (let i = 1; i <= e.target.value; i++) {
      const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
      totalRandom += randomChar;
    }

    setPassword(totalRandom);
  };

  const strengthCheck = () => {
    let color = "bg-red-700";
    let text = "VERY WEAK";
    if (
      upperSelected &&
      lowerSelected &&
      numberSelected &&
      symbolSelected &&
      password.length >= 8
    ) {
      color = "bg-green-700";
      text = "STRONG";
    } else if (
      !upperSelected &&
      !lowerSelected &&
      !numberSelected &&
      !symbolSelected &&
      password.length <= 6
    ) {
      color = "bg-red-700";
      text = "VERY WEAK";
    } else if (
      !upperSelected &&
      !lowerSelected &&
      numberSelected &&
      symbolSelected &&
      password.length <= 6
    ) {
      color = "bg-red-300";
      text = "WEAK";
    } else {
      color = "bg-yellow-700";
      text = "MEDIUM";
    }
    return { color, text };
  };

  const HandleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopyCheck(true);
  };

  const HandleUndoCopy = () => {
    setCopyCheck(false);
  };

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center flex-col">
      <h1 className="text-gray-700 text-2xl mb-4">Password Generator</h1>
      <div className="pass-view bg-gray-800 py-3 px-5 w-[500px] flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-bold">{password}</h1>
        {copyCheck ? (
          <TbCopyCheck
            className="text-green-300 text-2xl font-bold cursor-pointer"
            onClick={HandleUndoCopy}
          />
        ) : (
          <TbCopy
            className="text-green-300 text-2xl font-bold cursor-pointer"
            onClick={HandleCopy}
          />
        )}
      </div>
      <div className="options  bg-gray-800 py-3 px-5 w-[500px] flex items-center justify-between flex-col gap-5">
        <div className="character-length flex items-center justify-between w-full">
          <h2 className="text-white text-md">Character length</h2>
          <h1 className="text-green-300 text-2xl font-bold">{range}</h1>
        </div>
        <div className="input-slide w-full">
          <input
            className="w-full"
            type="range"
            name="slide"
            id="slide"
            min={5}
            max={30}
            value={range}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="pass-options flex flex-col gap-3 w-full">
          <div className="uppercase-option">
            <input
              type="checkbox"
              name="check1"
              checked={upperSelected}
              onChange={() => {
                setUpperSelected((prev) => !prev);
              }}
            />
            <label className="ml-5 text-white text-md" htmlFor="check1">
              Include Uppercase Letters
            </label>
          </div>
          <div className="lowercase-option">
            <input
              type="checkbox"
              name="check1"
              checked={lowerSelected}
              onChange={() => {
                setLowerSelected((prev) => !prev);
              }}
            />
            <label className="ml-5 text-white text-md" htmlFor="check1">
              Include Lowercase Letters
            </label>
          </div>
          <div className="numbers-option">
            <input
              type="checkbox"
              name="check1"
              checked={numberSelected}
              onChange={() => {
                setNumberSelected((prev) => !prev);
              }}
            />
            <label className="ml-5 text-white text-md" htmlFor="check1">
              Include Numbers
            </label>
          </div>
          <div className="symbols-option">
            <input
              type="checkbox"
              name="check1"
              checked={symbolSelected}
              onChange={() => {
                setSymbolSelected((prev) => !prev);
              }}
            />
            <label className="ml-5 text-white text-md" htmlFor="check1">
              Include Symbols
            </label>
          </div>
        </div>
        <div className="strength flex items-center justify-between px-5 py-4 w-full bg-gray-950 mb-5">
          <h1 className="text-gray-600 font-semibold">Strength</h1>
          <div className="strength-meter flex gap-2">
            <h1 className="text-white font-bold">{strengthSelected}</h1>
            <div
              className={`border-solid border-2 px-[2px] ${strengthColor}`}
            ></div>
            <div
              className={`border-solid border-2 px-[2px] ${strengthColor}`}
            ></div>
            <div
              className={`border-solid border-2 px-[2px] ${strengthColor}`}
            ></div>
            <div
              className={`border-solid border-2 px-[2px] ${strengthColor}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

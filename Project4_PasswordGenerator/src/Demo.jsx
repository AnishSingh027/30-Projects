import { FaRegCopy } from "react-icons/fa";
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

  useEffect(() => {
    const { color, text } = strengthCheck();
    setStrengthSelected(text);
    setStrengthColor(color);
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
      charSet = lowerCase; // Default to lowercase if no options are selected
    }

    for (let i = 1; i <= e.target.value; i++) {
      const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
      totalRandom += randomChar;
    }

    setPassword(totalRandom);
  };

  const strengthCheck = () => {
    let color = "bg-red-700"; // Default color for weak passwords
    let text = "VERY WEAK"; // Default text for weak passwords

    if (
      upperSelected &&
      lowerSelected &&
      numberSelected &&
      symbolSelected &&
      password.length >= 8
    ) {
      color = "bg-green-700"; // Strong color
      text = "STRONG";
    } else if (password.length <= 6) {
      color = "bg-red-700"; // Very weak if password is too short
      text = "VERY WEAK";
    } else if (
      password.length <= 6 ||
      !(upperSelected && lowerSelected && (numberSelected || symbolSelected))
    ) {
      color = "bg-red-300"; // Weak password
      text = "WEAK";
    } else {
      color = "bg-yellow-700"; // Medium strength
      text = "MEDIUM";
    }

    return { color, text };
  };

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center flex-col">
      <h1 className="text-gray-700 text-2xl mb-4">Password Generator</h1>
      <div className="pass-view bg-gray-800 py-3 px-5 w-[500px] flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-bold">{password}</h1>
        <FaRegCopy className="text-green-300 text-2xl font-bold cursor-pointer" />
      </div>
      <div className="options bg-gray-800 py-3 px-5 w-[500px] flex items-center justify-between flex-col gap-5">
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
              onChange={() => setUpperSelected((prev) => !prev)}
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
              onChange={() => setLowerSelected((prev) => !prev)}
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
              onChange={() => setNumberSelected((prev) => !prev)}
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
              onChange={() => setSymbolSelected((prev) => !prev)}
            />
            <label className="ml-5 text-white text-md" htmlFor="check1">
              Include Symbols
            </label>
          </div>
        </div>
        <p className="text-white">{strengthSelected}</p>
        <div className="strength flex items-center justify-between px-5 py-4 w-full bg-gray-950 mb-5">
          <h1 className="text-gray-600 font-semibold">Strength</h1>
          <div className="strength-meter flex gap-2">
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

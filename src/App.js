import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      const num = getRandomInt(1, 6);
      arr.push({ value: num, isHeld: false, id: nanoid() });
    }
    return arr;
  }

  const diceArray = dice.map((num) => {
    return (
      <Die
        value={num.value}
        key={num.id}
        isHeld={num.isHeld}
        holdDice={() => holdDice(num.id)}
      />
    );
  });

  function roll() {
    if (tenzies !== true) {
      setDice((prevState) =>
        prevState.map((dice) => {
          return dice.isHeld
            ? dice
            : {
                value: getRandomInt(1, 6),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }
  function holdDice(id) {
    setDice((prevState) => {
      return prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceArray}</div>
      <button className="dice-roll" onClick={roll}>
        {tenzies === true ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

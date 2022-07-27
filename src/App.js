import "./App.css";
import React from "react";
import Dice from "./Components/Dice.js";
import clsx from "clsx";

export default function App() {
  const nbDices = 10;

  const [dices, setDices] = React.useState([]);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hasWon, setHasWon] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);



  React.useEffect(()=>{
    handleResize()
  },[])

  function handleResize(){
    if(window.innerWidth >= 670){
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }


  window.addEventListener("resize", handleResize);




  //Console.logging the values of the dices when they change.
  React.useEffect(() => {
    const areAllFrozen = dices.every((dice) => dice.frozen === true);
    const areAllSameValue = dices.every((dice) => dice.value === dices[0].value);

    if (areAllFrozen && areAllSameValue) {
      setHasWon(true);
      console.log("You won!")
    }

    console.log(dices);
  }, [dices]);

  function getAllNewDices(nbDices) {
    const newDices = [];
    for (let i = 0; i < nbDices; i++) {
      let randomNumber = Math.floor(Math.random() * 6) + 1;
      newDices.push({ frozen: false, value: randomNumber });
    }
    setDices(newDices);
    console.log("Initial dice roll:", newDices, dices);
  }

  function rerollUnfrozenDice() {
    let randomArray = [];

    randomArray = dices.map((dice) => {
      let randomNumber = Math.floor(Math.random() * 6) + 1;

      if (dice.frozen === false)
        return { ...dice, value: randomNumber };

      return dice;
    });
    console.log("New dice roll: ");
    return randomArray;
  }

  function startGame() {
    setHasWon(false);
    getAllNewDices(nbDices);
    setHasStarted(true);
    console.log("GAME STARTED", hasStarted);
  }

  function rollTheDice() {
    setDices(rerollUnfrozenDice());
  }

  function playAgain() {
    console.log("played again");
    startGame();
  }

  //le parametre id, c'est l'index du dice qui sera cliqué. le dice qui est cliqué passe sont index en argument à la fct() et on change seulement celui-là dans le map
  function freezeDice(id) {
    setDices((prevState) => {
      prevState[id].frozen = !prevState[id].frozen;
      return [...prevState];
    });
  }

  return (
    <div className="App">
      <h1 className={clsx({"title--desktop":!isMobile, "title--mobile":isMobile})}>Tenzies!</h1>
      <div className={clsx({"playboard--desktop":!isMobile, "playboard--mobile":isMobile})}>
        <div>
          <h1 style={{textAlign:"center", marginBottom:"10px"}}>How to play</h1>
          <p className={clsx({"instructions--desktop":!isMobile, "instructions--mobile":isMobile})}>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>

        {hasStarted && (
          <Dice dices={dices} onClick={freezeDice} hasWon={hasWon} isMobile={isMobile}/>
        )}

        <button
          onClick={hasStarted ? (hasWon ? playAgain : rollTheDice) : startGame}
          className={clsx({
            "ingameButton--desktop":!isMobile,
            "ingameButton--mobile":isMobile,
            "playAgain": (hasStarted && hasWon), 
            "rerollButton": (hasStarted && !hasWon),
            "startButton": !hasStarted
          })}
        >
          {hasStarted ? (hasWon ? "Play again!" : "Reroll") : "Start"}
        </button>
      </div>
    </div>
  );
}



import React from "react"
import Confetti from "react-confetti"
export default function Dice(props) {	

	
	return (
    <div>
			{props.hasWon && <Confetti />}
			<div className="Dices">
				{props.dices.map((dice, index) => {
					return(
						<div className={`dice ${dice.frozen ? "frozen" : ""}`} key={index} id={index} onClick={() => props.onClick(index)}>{dice.value}</div>
						)
					})}
				</div>
    </div>
  );



}
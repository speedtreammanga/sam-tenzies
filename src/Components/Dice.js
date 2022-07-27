import clsx from "clsx";
import React from "react"
import Confetti from "react-confetti"
export default function Dice(props) {	
	let isMobile = props.isMobile;
	
	return (
    <div>
			{props.hasWon && <Confetti style={{width:"100%"}}/>}
			<div className={clsx({"Dices--desktop":!isMobile, "Dices--mobile":isMobile})}>
				{props.dices.map((dice, index) => {
					return(
						<div className={clsx({"frozen":dice.frozen, "dice--desktop":!isMobile, "dice--mobile":isMobile})} key={index} id={index} onClick={() => props.onClick(index)}>{dice.value}</div>
						)
					})}
				</div>
    </div>
  );



}
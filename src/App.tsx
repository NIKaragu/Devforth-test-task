import { useState } from 'react';
import { BalanceScreen } from './components/BalanceScreen';
import { BetPanel } from './components/BetPanel';
import { DiceBoard } from './components/DiceBoard';
import { PricesBoard } from './components/PricesBorad';

function App() {
	const [diceValues, setDiceValues] = useState<number[]>([]);
	const [isRolling, setIsRolling] = useState(false);
	const rollAllDice = () => {
		setIsRolling(true);
		document.querySelectorAll('#dice-wrapper button').forEach(button => {
			(button as HTMLButtonElement).click();
		});
	};

	const handleReadDiceValues = (value: number) => {
		setDiceValues(prev => {
			const updatedValues = prev.length === 5 ? [value] : [...prev, value];
			if (updatedValues.length === 5) {
				console.log(updatedValues);
			}
			return updatedValues;
		});
		setIsRolling(false);
	};
	return (
		<div className="grid w-fit grid-cols-2 grid-rows-2 gap-6 place-self-center">
			<DiceBoard handleReadDiceValues={handleReadDiceValues} />
			<PricesBoard />
			<div className="col-start-2 col-end-2 flex flex-col justify-between gap-6">
				<BetPanel isRolling={isRolling} handleRollClick={rollAllDice} />
				<BalanceScreen />
			</div>
		</div>
	);
}

export default App;

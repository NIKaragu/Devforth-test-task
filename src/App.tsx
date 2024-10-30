import { useEffect, useMemo, useState } from 'react';
import { BalanceScreen } from './components/BalanceScreen';
import { BetPanel } from './components/BetPanel';
import { DiceBoard } from './components/DiceBoard';
import { PricesBoard } from './components/PricesBorad';
import { getUser, initBalance, resetBalance } from './api/api';
import { User } from './utils/types/User';
import { countCombos } from './utils/helpers/countCombos';

function App() {
	const [diceValues, setDiceValues] = useState<number[]>([]);
	const [user, setUser] = useState<User | null>(null);
	const [diceCombo, setDiceCombo] = useState<number>(0);
	useMemo(() => {
		if (diceValues.length === 5) {
			const combos = countCombos(diceValues);
			setDiceCombo(combos);
		}
	}, [diceValues]);

	const rollAllDice = () => {
		setDiceCombo(0);
		document.querySelectorAll('#dice-wrapper button').forEach(button => {
			(button as HTMLButtonElement).click();
		});
	};

	const handleReadDiceValues = (value: number) => {
		setDiceValues(prev => {
			const updatedValues = prev.length === 5 ? [value] : [...prev, value];

			return updatedValues;
		});
	};

	const handleBetSuccess = async () => {
		await getUserInfoUpdate();
	};

	const getUserInfoUpdate = async () => {
		try {
			const userData = await getUser();
			setUser(userData);
		} catch {
			throw new Error('User fetch error');
		}
	};

	const init = async () => {
		await initBalance();
		await getUserInfoUpdate();
	};

	const reset = async () => {
		await resetBalance();
		await initBalance();
		await getUserInfoUpdate();
	};

	useEffect(() => {
		init();

		return () => {
			reset();
		};
	}, []);

	return (
		<div className="grid w-fit grid-cols-2 grid-rows-2 gap-6 place-self-center">
			<DiceBoard handleReadDiceValues={handleReadDiceValues} />
			<PricesBoard diceCombo={diceCombo} />
			<div className="col-start-2 col-end-2 flex flex-col justify-between gap-6">
				<BetPanel
					diceCombo={diceCombo}
					user={user}
					handleRollClick={rollAllDice}
					handleBetSuccess={handleBetSuccess}
				/>
				<BalanceScreen user={user} />
			</div>
		</div>
	);
}

export default App;

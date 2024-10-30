import { useEffect, useMemo, useState } from 'react';
import { makeBet } from '../../api/api';
import { User } from '../../utils/types/User';
import { countWin } from '../../utils/helpers/countWin';
import { BetErrorMessage } from '../BetErrorMessage';

type Props = {
	user: User | null;
	diceCombo: number;
	handleBetSuccess: () => void;
	handleRollClick: () => void;
};

export const BetPanel: React.FC<Props> = ({
	user,
	diceCombo,
	handleRollClick,
	handleBetSuccess,
}: Props) => {
	const [betValue, setBetValue] = useState(0);
	const [isBetValueError, setIsBetValueError] = useState(false);
	const [isBetCompleted, setIsBetCompleted] = useState(true);
	const notEnoughMoneyError = useMemo(() => {
		if (user) {
			return user ? user.balance < betValue : false;
		}

		return false;
	}, [betValue, user]);

	const handleBet = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!betValue) {
			const rollingTime = 2000;

			setIsBetValueError(true);
			setTimeout(() => {
				setIsBetValueError(false);
			}, rollingTime);
			return;
		}

		if (!notEnoughMoneyError) {
			await makeBet(betValue, user as User);
			handleRollClick();
			handleBetSuccess();
			setIsBetCompleted(false);
		}
	};

	const handleBetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!isNaN(parseInt(event.target.value))) {
			setBetValue(parseInt(event.target.value));
		} else {
			setBetValue(0);
		}
	};

	useEffect(() => {
		const handleWin = async () => {
			if (!isBetCompleted && diceCombo > 1) {
				if (diceCombo > 1) {
					await countWin(diceCombo, betValue, user as User);
					handleBetSuccess();
				}
				setBetValue(0);
				setIsBetCompleted(true);
			}
		};

		handleWin();
	}, [diceCombo, isBetCompleted, betValue, user]);

	return (
		<div className="component-flexbox relative flex-col items-center gap-2 pb-4 pl-2 pr-2 pt-2">
			<h3 className="component-title">Bet</h3>
			<div className="flex gap-2">
				<input
					type="text"
					disabled={!isBetCompleted}
					value={betValue}
					onChange={handleBetInput}
					className="w-12 rounded-sm border-2 border-black bg-gradient-to-b from-slate-300 to-slate-50 pl-2 pr-2 text-center"
				/>
				<button
					type="submit"
					className="h-8 rounded-sm border-2 border-black bg-gradient-to-b from-slate-100 to-red-300 pl-2 pr-2"
					onClick={handleBet}
					disabled={!isBetCompleted || isBetValueError || notEnoughMoneyError}
				>
					ROLL
				</button>
			</div>
			<BetErrorMessage
				renderCondition={isBetValueError}
				message="Bet must be more than 0"
			/>
			<BetErrorMessage
				renderCondition={notEnoughMoneyError && isBetCompleted}
				message="Not enough money"
			/>
		</div>
	);
};

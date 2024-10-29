import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { makeBet } from '../../api/api';
import { User } from '../../utils/types/User';
import { countWin } from '../../utils/helpers/countWin';

type Props = {
	isRolling: boolean;
	user: User | null;
	diceCombo: number;
	handleBetSuccess: () => void;
	handleRollClick: () => void;
};

export const BetPanel: React.FC<Props> = ({
	isRolling,
	user,
	diceCombo,
	handleRollClick,
	handleBetSuccess,
}: Props) => {
	const [betValue, setBetValue] = useState(0);
	const [isBetValueError, setIsBetError] = useState(false);
	const notEnoughMoneyError = useMemo(() => {
		if (user) {
			return user ? user.balance < betValue : false;
		}

		return false;
	}, [betValue, user]);

	const [hasBetCompleted, setHasBetCompleted] = useState(false);

	const handleBet = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!betValue) {
			setIsBetError(true);
			setTimeout(() => {
				setIsBetError(false);
			}, 2000);
			return;
		}

		if (!notEnoughMoneyError) {
			await makeBet(betValue, user as User);
			handleRollClick();
			handleBetSuccess();
			setHasBetCompleted(true);
		}

		// while (diceCombo === 0) {
		// 	if (diceCombo > 1) {
		// 		await countWin(diceCombo, betValue, user as User);
		// 		handleBetSuccess();
		// 		break;
		// 	}
		// }
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
			if (hasBetCompleted && diceCombo > 0) {
				if (diceCombo > 1) {
					await countWin(diceCombo, betValue, user as User);
					handleBetSuccess();
				}
				setBetValue(0);
				setHasBetCompleted(false);
			}
		};

		handleWin();
	}, [diceCombo, hasBetCompleted, betValue, user]);

	return (
		<div className="component-flexbox relative flex-col items-center gap-2 pb-4 pl-2 pr-2 pt-2">
			<h3 className="component-title">Bet</h3>
			<div className="flex gap-2">
				<input
					type="text"
					disabled={isRolling}
					value={betValue}
					onChange={handleBetInput}
					className="w-12 rounded-sm border-2 border-black bg-gradient-to-b from-slate-300 to-slate-50 pl-2 pr-2 text-center"
				/>
				<button
					type="submit"
					className="h-8 rounded-sm border-2 border-black bg-gradient-to-b from-slate-100 to-red-300 pl-2 pr-2"
					onClick={handleBet}
					disabled={isRolling || isBetValueError || notEnoughMoneyError}
				>
					ROLL
				</button>
			</div>
			{isBetValueError && (
				<div
					className={classNames(
						'bet-error absolute -bottom-4 w-fit text-nowrap rounded-sm bg-red-100 pl-1 pr-1 font-semibold text-red-500',
						isBetValueError && 'bet-error-visible'
					)}
				>
					Bet must be more than 0
				</div>
			)}
			{notEnoughMoneyError && (
				<div
					className={classNames(
						'bet-error absolute -bottom-4 w-fit text-nowrap rounded-sm bg-red-100 pl-1 pr-1 font-semibold text-red-500',
						notEnoughMoneyError && 'bet-error-visible'
					)}
				>
					Not enough money
				</div>
			)}
		</div>
	);
};

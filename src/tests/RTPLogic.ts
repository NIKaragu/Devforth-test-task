import { countCombos } from '../utils/helpers/countCombos';

function generateRandomDice() {
	const randomNumbers = [];

	for (let i = 0; i < 5; i++) {
		const randomNumber = Math.floor(Math.random() * 6) + 1;
		randomNumbers.push(randomNumber);
	}

	return randomNumbers;
}

export function playRound(betAmount: number): number {
	const combo = countCombos(generateRandomDice());

	if (combo === 1) {
		return 0;
	}
	return combo * betAmount;
}

export function simulateRTP(rounds: number, multiplier: number = 3): number {
	let totalBets = 0;
	let totalWins = 0;

	for (let i = 0; i < rounds; i++) {
		const bet = Math.round(Math.random() * 100);
		totalBets += bet;

		const winChance = Math.random();
		let winAmount = 0;

		if (winChance < 0.25) {
			winAmount = bet * multiplier;
		}

		totalWins += winAmount;
	}
	const rtp = (totalWins / totalBets) * 100;
	return rtp;
}

export function adjustOdds(
	currentRTP: number,
	targetRTP: number,
	baseMultiplier: number
): number {
	let newMultiplier = baseMultiplier;

	const difference = targetRTP - currentRTP;
	const adjustmentFactor = Math.abs(difference) * 0.02;

	if (difference > 0) {
		newMultiplier += adjustmentFactor;
	} else {
		newMultiplier -= adjustmentFactor;
	}

	newMultiplier = Math.min(Math.max(newMultiplier, 2.0), 5.0);

	return newMultiplier;
}

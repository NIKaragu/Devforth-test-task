export function playRound(betAmount: number): number {
	const outcome = Math.random();

	if (outcome < 0.2) {
		return betAmount * 5;
	} else if (outcome < 0.4) {
		return betAmount * 4;
	} else if (outcome < 0.6) {
		return betAmount * 3;
	} else if (outcome < 0.8) {
		return betAmount * 2;
	}

	return 0;
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

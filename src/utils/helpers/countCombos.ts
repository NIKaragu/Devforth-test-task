export function countCombos(diceValues: number[]): number {
	const combos = diceValues.reduce<Record<number, number>>(
		(acc, value: number) => {
			if (!acc[value]) {
				acc[value] = 0;
			}

			acc[value] += 1;

			return acc;
		},
		{}
	);

	const maxRepeatCount = Object.values(combos).flat();

	return Math.max(...maxRepeatCount);
}

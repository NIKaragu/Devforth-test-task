/* eslint-disable no-console */
import { simulateRTP, adjustOdds } from './RTPLogic';
import { describe, it, expect } from '@jest/globals';

describe('RTP Simulation', () => {
	it('should calculate the RTP over 1 million rounds', () => {
		const calculatedRTP = simulateRTP(1000000);
		console.log(`Simulated RTP: ${calculatedRTP.toFixed(2)}%`);

		expect(calculatedRTP).toBeGreaterThan(0);
	});

	it('should adjust odds to achieve target RTP close to 60%', () => {
		console.log('-----------------------------------------------------');
		let currentRTP = simulateRTP(1000);
		console.log(`Primary RTP before adjustment: ${currentRTP.toFixed(2)}%`);

		const targetRTP = 60;
		let adjustedMultiplier = 2.0;
		let difference = Math.abs(targetRTP - currentRTP);
		let iterations = 0;
		const maxIterations = 100;

		while (difference > 0.2 && iterations < maxIterations) {
			adjustedMultiplier = adjustOdds(
				currentRTP,
				targetRTP,
				adjustedMultiplier
			);

			currentRTP = simulateRTP(2000, adjustedMultiplier);
			difference = Math.abs(targetRTP - currentRTP);
			iterations++;
		}

		console.log(`Final RTP after adjustment: ${currentRTP.toFixed(2)}%`);
		console.log(
			`Adjusted winning multiplier: ${adjustedMultiplier.toFixed(1)}`
		);
		expect(currentRTP).toBeCloseTo(targetRTP, 0.1);
	});

	it('should adjust odds to achieve target RTP close to 95%', () => {
		console.log('-----------------------------------------------------');
		let currentRTP = simulateRTP(1000);
		console.log(`Primary RTP before adjustment: ${currentRTP.toFixed(2)}%`);

		const targetRTP = 95;
		let adjustedMultiplier = 5.0;
		let difference = Math.abs(targetRTP - currentRTP);
		let iterations = 0;
		const maxIterations = 100;

		while (difference > 0.2 && iterations < maxIterations) {
			adjustedMultiplier = adjustOdds(
				currentRTP,
				targetRTP,
				adjustedMultiplier
			);

			currentRTP = simulateRTP(2000, adjustedMultiplier);
			difference = Math.abs(targetRTP - currentRTP);
			iterations++;
		}

		console.log(`Final RTP after adjustment: ${currentRTP.toFixed(2)}%`);
		console.log(
			`Adjusted winning multiplier: ${adjustedMultiplier.toFixed(1)}`
		);
		expect(currentRTP).toBeCloseTo(targetRTP, 0.1);
	});
});

import { getPrize } from '../../api/api';
import { User } from '../types/User';

export async function countWin(combo: number, value: number, user: User) {
	if (combo > 1) {
		// console.log('WON, combo: ', combo);
		await getPrize(value * combo, user);
	}
}

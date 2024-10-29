import axios from 'axios';
import { Transaction } from '../utils/types/Transaction';
import { User } from '../utils/types/User';
import { TransactionType } from '../utils/types/TransactionType';

const server = axios.create({
	baseURL: 'http://localhost:3001',
	timeout: 3000,
});

export async function makeBet(value: number, user: User) {
	await server.post<Transaction>('/transactions', {
		type: TransactionType.bet,
		value: value,
	});
	await server.put(`/users/${user.id}`, {
		...user,
		balance: user.balance - value,
	});
}

export async function getUser(userId = 1): Promise<User> {
	const { data } = await server.get(`/users/${userId}`);

	return data;
}

export async function initBalance() {
	const { balance } = await getUser();
	if (balance === 0) {
		await server.post<Transaction>('/transactions', {
			type: TransactionType.init,
			value: 100,
		});
		await server.put('/users/1', { id: 1, balance: 100 });
	}
}

export async function getPrize(value: number, user: User) {
	await server.post<Transaction>('/transactions', {
		type: TransactionType.win,
		value: value,
	});
	await server.put(`/users/${user.id}`, {
		...user,
		balance: user.balance + value,
	});
}

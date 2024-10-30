import axios from 'axios';
import { Transaction } from '../utils/types/Transaction';
import { User } from '../utils/types/User';
import { TransactionType } from '../utils/types/TransactionType';

const server = axios.create({
	baseURL: 'http://localhost:3001',
	timeout: 3000,
});

export async function makeBet(value: number, user: User) {
	await server
		.post<Transaction>('/transactions', {
			type: TransactionType.bet,
			value: value,
		})
		.catch(() => {
			throw new Error('Bet transaction error');
		});
	await server
		.put(`/users/${user.id}`, {
			...user,
			balance: user.balance - value,
		})
		.catch(() => {
			throw new Error('Disappearing a bet number from user`s balance error');
		});
}

export async function getUser(userId = 1): Promise<User> {
	const { data } = await server.get(`/users/${userId}`).catch(() => {
		throw new Error('Get user`s data error');
	});

	return data;
}

export async function initBalance() {
	const { balance } = await getUser();
	if (balance === 0) {
		await server
			.post<Transaction>('/transactions', {
				type: TransactionType.init,
				value: 100,
			})
			.catch(() => {
				throw new Error('Init transaction error');
			});

		await server.put('/users/1', { id: 1, balance: 100 }).catch(() => {
			throw new Error('Init user`s balance error');
		});
	}
}

export async function resetBalance() {
	const { balance } = await getUser();
	if (balance > 0) {
		await server.put('/users/1', { id: 1, balance: 0 }).catch(() => {
			throw new Error('Reset balance error');
		});
	}
}

export async function getPrize(value: number, user: User) {
	await server
		.post<Transaction>('/transactions', {
			type: TransactionType.win,
			value: value,
		})
		.catch(() => {
			throw new Error('Win transaction error');
		});
	await server
		.put(`/users/${user.id}`, {
			...user,
			balance: user.balance + value,
		})
		.catch(() => {
			throw new Error('Prize wasn`t delivered');
		});
}

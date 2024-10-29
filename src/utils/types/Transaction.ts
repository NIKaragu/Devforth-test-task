import { TransactionType } from './TransactionType';

export interface Transaction {
	value: number;
	type: TransactionType;
}

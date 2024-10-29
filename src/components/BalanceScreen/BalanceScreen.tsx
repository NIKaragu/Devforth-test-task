import { User } from '../../utils/types/User';

type Props = {
	user: User | null;
};

export const BalanceScreen = ({ user }: Props) => {
	const balance = user ? user.balance : 'No balance';

	return (
		<div className="component-flexbox flex-col items-center gap-2 pb-2 pl-3 pr-3 pt-2">
			<h3 className="component-title">Your balance</h3>
			<p>{balance}</p>
		</div>
	);
};

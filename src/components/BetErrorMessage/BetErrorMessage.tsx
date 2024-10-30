import classNames from 'classnames';

type Props = {
	renderCondition: boolean;
	message: string;
};

export const BetErrorMessage = ({ renderCondition, message }: Props) => {
	if (renderCondition) {
		return (
			<div
				className={classNames(
					'bet-error absolute -bottom-4 w-fit text-nowrap rounded-sm bg-red-100 pl-1 pr-1 font-semibold text-red-500',
					renderCondition && 'bet-error-visible'
				)}
			>
				{message}
			</div>
		);
	}
};

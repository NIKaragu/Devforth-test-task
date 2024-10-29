import classNames from 'classnames';

type Props = {
	diceCombo?: number;
};

export const PricesBoard = ({ diceCombo }: Props) => {
	return (
		<div className="component-flexbox flex-col gap-4 pb-2 pl-3 pr-3 pt-2">
			<h3 className="component-title self-center">Prices</h3>
			<div className="flex flex-col gap-1">
				<div
					className={classNames('flex justify-between', {
						'text-red-500': diceCombo === 2,
					})}
				>
					<p className="">Pair</p>
					<p className="font-bold">x2</p>
				</div>
				<div
					className={classNames('flex justify-between', {
						'text-red-500': diceCombo === 3,
					})}
				>
					<p className="">Full house</p>
					<p className="font-bold">x3</p>
				</div>
				<div
					className={classNames('flex justify-between', {
						'text-red-500': diceCombo === 4,
					})}
				>
					<p className="">Balut</p>
					<p className="font-bold">x4</p>
				</div>
				<div
					className={classNames('flex justify-between', {
						'text-red-500': diceCombo === 5,
					})}
				>
					<p className="">Straight</p>
					<p className="font-bold">x5</p>
				</div>
				<div
					className={classNames('flex justify-between', {
						'text-red-500': diceCombo < 2 && diceCombo >= 0,
					})}
				>
					<p className="">Other</p>
					<p className="font-bold">x0</p>
				</div>
			</div>
		</div>
	);
};

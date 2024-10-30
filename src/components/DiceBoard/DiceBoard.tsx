import Dice from 'react-dice-roll';

type Props = {
	// eslint-disable-next-line no-unused-vars
	handleReadDiceValues: (value: number) => void;
};

export const DiceBoard = ({ handleReadDiceValues }: Props) => {
	return (
		<div className="component-flexbox col-start-1 -col-end-1 h-fit w-fit flex-col items-center gap-4 self-end rounded-sm pb-6 pl-12 pr-12 pt-6">
			<h1 className="component-title">Dice</h1>
			<div id="dice-wrapper" className="flex flex-row gap-4">
				{[1, 4, 2, 5, 6].map((defaultValue, index) => (
					<Dice
						key={index}
						defaultValue={defaultValue as 1 | 2 | 3 | 4 | 5 | 6}
						size={36}
						onRoll={value => {
							handleReadDiceValues(value);
						}}
						rollingTime={Math.random() * 2000}
					/>
				))}
			</div>
		</div>
	);
};

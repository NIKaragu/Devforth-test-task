export const DiceBoard = () => {
	return (
		<div className="component-flexbox col-start-1 -col-end-1 h-fit w-fit flex-col items-center gap-4 self-end rounded-sm pb-6 pl-12 pr-12 pt-6">
			<h1 className="component-title">Dice</h1>
			<div className="flex flex-row gap-2">
				<div className="dice-block"></div>
				<div className="dice-block"></div>
				<div className="dice-block"></div>
				<div className="dice-block"></div>
				<div className="dice-block"></div>
			</div>
		</div>
	);
};

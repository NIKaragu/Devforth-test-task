export const BetPanel = () => {
	return (
		<div className="component-flexbox flex-col items-center gap-2 pb-4 pl-2 pr-2 pt-2">
			<h3 className="component-title">Bet</h3>
			<div className="flex gap-2">
				<input
					type="text"
					className="w-12 rounded-sm border-2 border-black bg-gradient-to-b from-slate-300 to-slate-50 pl-2 pr-2 text-center"
				/>
				<button className="h-8 rounded-sm border-2 border-black bg-gradient-to-b from-slate-100 to-red-300 pl-2 pr-2">
					ROLL
				</button>
			</div>
		</div>
	);
};

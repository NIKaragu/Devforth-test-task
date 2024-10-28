export const PricesBoard = () => {
	return (
		<div className="component-flexbox flex-col gap-4 pb-2 pl-3 pr-3 pt-2">
			<h3 className="component-title self-center">Prices</h3>
			<div className="flex flex-col gap-1">
				<div className="flex justify-between">
					<p className="">Pair</p>
					<p className="font-bold">x2</p>
				</div>
				<div className="flex justify-between">
					<p className="">Full house</p>
					<p className="font-bold">x3</p>
				</div>
				<div className="flex justify-between">
					<p className="">Balut</p>
					<p className="font-bold">x4</p>
				</div>
				<div className="flex justify-between">
					<p className="">Straight</p>
					<p className="font-bold">x5</p>
				</div>
				<div className="flex justify-between">
					<p className="">Other</p>
					<p className="font-bold">x0</p>
				</div>
			</div>
		</div>
	);
};

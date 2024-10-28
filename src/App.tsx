import { BalanceScreen } from './components/BalanceScreen';
import { BetPanel } from './components/BetPanel';
import { DiceBoard } from './components/DiceBoard';
import { PricesBoard } from './components/PricesBorad';

function App() {
	return (
		<div className="grid w-fit grid-cols-2 grid-rows-2 gap-6 place-self-center">
			<DiceBoard />
			<PricesBoard />
			<div className="col-start-2 col-end-2 flex flex-col justify-between gap-6">
				<BetPanel />
				<BalanceScreen />
			</div>
		</div>
	);
}

export default App;

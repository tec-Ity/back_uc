import { Switch, Route, Redirect} from 'react-router-dom';

import HomePage from '../views/_index/HomePage';
import Errpage from '../views/_index/Errpage';

import OwerRouter from './OwerRouter';
import MgerRouter from './MgerRouter';
import SferRouter from './SferRouter';
import BserRouter from './BserRouter';
import WkerRouter from './WkerRouter';

export default function AppRouter(props) {
	return (
		<Switch>
			<Route path="/home" ><HomePage /></Route>

			<Route path="/errpage" component={Errpage} />
			
			<Route path="/ower" component={OwerRouter} />
			<Route path="/mger" component={MgerRouter} />
			<Route path="/sfer" component={SferRouter} />
			<Route path="/bser" component={BserRouter} />
			<Route path="/wker" component={WkerRouter} />

			<Redirect to="/home" />
		</Switch>
	)
}

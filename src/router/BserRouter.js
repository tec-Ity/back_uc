import { Switch, Route, Redirect} from 'react-router-dom';

import HomeRole from '../views/_index/HomeRole';
import Setting from '../views/_index/Setting';
import Center from '../views/_index/Center';	// 个人中心

import Users from '../views/user/list/Users';
import User from '../views/user/detail/User';

import Prods from '../views/prod/list/Prods';
import Prod from '../views/prod/detail/Prod';

import Orders from '../views/order/list/Orders';

import Pds from '../views/pd/list/Pds';
import Pd from '../views/pd/detail/Pd';

import Reload from '../views/_index/Reload';	// 重新加载页面

export default function BserRouter() {
	return (
		<div className="container mt-3">
			<Switch>
				<Route path="/bser/home" > <HomeRole /> </Route>
				<Route path="/bser/center" > <Center /> </Route>

				<Route path="/bser/users" > <Users /> </Route>
				<Route path="/bser/user/:id" > <User /> </Route>

                                <Route path="/bser/prods" > <Prods /> </Route>
				<Route path="/bser/prod/:id" > <Prod /> </Route>

				<Route path="/bser/orders" > <Orders /> </Route>

				<Route path="/bser/pds" > <Pds /> </Route>
				<Route path="/bser/pd/:id" > <Pd /> </Route>

				<Route path="/bser/setting" > <Setting /> </Route>

				<Route path="/bser/reload" > <Reload/> </Route>
				<Redirect to="/bser/home" />
			</Switch>
		</div>
	)
}

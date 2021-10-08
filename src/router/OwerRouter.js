import { Switch, Route, Redirect} from 'react-router-dom';

import HomeRole from '../views/_index/HomeRole';
import Setting from '../views/_index/Setting';
import Center from '../views/_index/Center';	// 个人中心

import Users from '../views/user/list/Users';
import User from '../views/user/detail/User';

import Shops from '../views/shop/list/Shops';
import Shop from '../views/shop/detail/Shop';

import Orders from '../views/order/list/Orders';

import Pds from '../views/pd/list/Pds';
import Pd from '../views/pd/detail/Pd';

import Brands from '../views/brand/list/Brands'

import Categs from '../views/categ/list/Categs'

import Reload from '../views/_index/Reload';	// 重新加载页面

export default function OwerRouter() {
	return (
		<div className="container mt-3">
			<Switch>
				<Route path="/ower/home" > <HomeRole /> </Route>
				<Route path="/ower/center" > <Center /> </Route>

				<Route path="/ower/users" > <Users /> </Route>
				<Route path="/ower/user/:id" > <User /> </Route>

				<Route path="/ower/shops" > <Shops /> </Route>
				<Route path="/ower/shop/:id" > <Shop /> </Route>

				<Route path="/ower/orders" > <Orders /> </Route>

				<Route path="/ower/pds" > <Pds /> </Route>
				<Route path="/ower/pd/:id" > <Pd /> </Route>

				<Route path="/ower/brands" > <Brands /> </Route>

				<Route path="/ower/categs" > <Categs /> </Route>

				<Route path="/ower/setting" > <Setting /> </Route>

				<Route path="/ower/reload" > <Reload/> </Route>
				<Redirect to="/ower/home" />
			</Switch>
		</div>
	)
}

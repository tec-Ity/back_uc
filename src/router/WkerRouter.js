import { Switch, Route, Redirect } from "react-router-dom";

import HomeRole from "../views/_index/HomeRole";
import Center from "../views/_index/Center"; // 个人中心

import User from "../views/user/detail/User";

import Prods from "../views/prod/list/Prods";
import Prod from "../views/prod/detail/Prod";

import Orders from "../views/order/list/Orders";

import Pds from "../views/pd/list/Pds";
import Pd from "../views/pd/detail/Pd";

import Reload from "../views/_index/Reload"; // 重新加载页面

export default function WkerRouter() {
  return (
    <div className='container mt-3'>
      <Switch>
        <Route path='/wker/home'>
          <HomeRole />
        </Route>
        <Route path='/wker/center'>
          <Center />
        </Route>

        <Route path='/wker/user/:id'>
          <User />
        </Route>

        <Route path='/wker/prods'>
          <Prods />
        </Route>
        <Route path='/wker/prod/:id'>
          <Prod />
        </Route>

        <Route path='/wker/orders'>
          <Orders />
        </Route>

        <Route path='/wker/pds'>
          <Pds />
        </Route>
        <Route path='/wker/pd/:id'>
          <Pd />
        </Route>

        <Route path='/wker/reload'>
          <Reload />
        </Route>
        <Redirect to='/wker/home' />
      </Switch>
    </div>
  );
}

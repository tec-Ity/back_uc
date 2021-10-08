import { Switch, Route, Redirect } from "react-router-dom";

import HomeRole from "../views/_index/HomeRole";
import Setting from "../views/_index/Setting";
import Center from "../views/_index/Center"; // 个人中心

import Prods from "../views/prod/list/Prods";
import Prod from "../views/prod/detail/Prod";

import Orders from "../views/order/list/Orders";

import Pds from "../views/pd/list/Pds";
import Pd from "../views/pd/detail/Pd";

import Reload from "../views/_index/Reload"; // 重新加载页面

export default function SferRouter() {
  return (
    <div className='container mt-3'>
      <Switch>
        <Route path='/sfer/home'>
          <HomeRole />
        </Route>
        <Route path='/sfer/center'>
          <Center />
        </Route>
        <Route path='/sfer/prods'>
          <Prods />
        </Route>
        <Route path='/sfer/prod/:id'>
          <Prod />
        </Route>
        <Route path='/sfer/orders'>
          <Orders />
        </Route>

        <Route path='/sfer/pds'>
          <Pds />
        </Route>
        <Route path='/sfer/pd/:id'>
          <Pd />
        </Route>

        <Route path='/sfer/setting'>
          <Setting />
        </Route>

        <Route path='/sfer/reload'>
          <Reload />
        </Route>
        <Redirect to='/sfer/home' />
      </Switch>
    </div>
  );
}

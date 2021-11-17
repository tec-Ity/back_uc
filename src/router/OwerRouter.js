import { Switch, Route, Redirect } from "react-router-dom";

import HomeRole from "../views/_index/HomeRole";
import Center from "../views/_index/Center"; // 个人中心

import Users from "../views/user/list/Users";
import User from "../views/user/detail/User";

import Shops from "../views/shop/list/Shops";
import Shop from "../views/shop/detail/Shop";

import Orders from "../views/order/list/Orders";
import Order from "../views/order/detail/Order";

import Pds from "../views/pd/list/Pds";
import Pd from "../views/pd/detail/Pd";

import Brands from "../views/brand/list/Brands";
import Brand from "../views/brand/detail/Brand";

import Categs from "../views/categ/list/Categs";
import Categ from "../views/categ/detail/Categ";

import Clients from "../views/client/list/Clients";
import Client from "../views/client/detail/Client";

import Setting from "../views/setting/Setting";
import Areas from "../views/setting/area/list/Areas";
import Nations from "../views/setting/nation/list/Nations";
import Citas from "../views/setting/city/list/Citas";
import Cita from "../views/setting/city/detail/Cita";

import Reload from "../views/_index/Reload"; // 重新加载页面

export default function OwerRouter() {
  return (
    <div className='container mt-3 pb-5'>
      <Switch>
        <Route path='/ower/home'>
          <HomeRole />
        </Route>
        <Route path='/ower/center'>
          <Center />
        </Route>

        <Route path='/ower/users'>
          <Users />
        </Route>
        <Route path='/ower/user/:id'>
          <User />
        </Route>

        <Route path='/ower/shops'>
          <Shops />
        </Route>
        <Route path='/ower/shop/:id'>
          <Shop />
        </Route>

        <Route path='/ower/orders'>
          <Orders />
        </Route>
        <Route path='/ower/order/:id'>
          <Order />
        </Route>

        <Route path='/ower/pds'>
          <Pds />
        </Route>
        <Route path='/ower/pd/:id'>
          <Pd />
        </Route>

        <Route path='/ower/brands'>
          <Brands />
        </Route>
        <Route path='/ower/brand/:id'>
          <Brand />
        </Route>

        <Route path='/ower/categs'>
          <Categs />
        </Route>
        <Route path='/ower/categ/:id'>
          <Categ />
        </Route>

        <Route path='/ower/clients'>
          <Clients />
        </Route>
        <Route path='/ower/client/:id'>
          <Client />
        </Route>

        <Route path='/ower/setting'>
          <Setting />
        </Route>
        <Route path='/ower/nations'>
          <Nations />
        </Route>
        <Route path='/ower/areas'>
          <Areas />
        </Route>
        <Route path='/ower/citas'>
          <Citas />
        </Route>
        <Route path='/ower/cita'>
          <Cita />
        </Route>

        <Route path='/ower/reload'>
          <Reload />
        </Route>
        <Redirect to='/ower/home' />
      </Switch>
    </div>
  );
}

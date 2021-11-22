import { Switch, Route, Redirect } from "react-router-dom";

import HomeRole from "../views/_index/HomeRole";
import Setting from "../views/setting/Setting";
import Center from "../views/_index/Center"; // 个人中心

import Users from "../views/user/list/Users";
import User from "../views/user/detail/User";

import Shops from "../views/shop/list/Shops";
import Shop from "../views/shop/detail/Shop";

import Orders from "../views/order/list/Orders";

import Pds from "../views/pd/list/Pds";
import Pd from "../views/pd/detail/Pd";

import Brands from "../views/brand/list/Brands";

import Categs from "../views/categ/list/Categs";

import Reload from "../views/_index/Reload"; // 重新加载页面
import Order from "../views/order/detail/Order";
import Nations from "../views/setting/nation/list/Nations";
import Areas from "../views/setting/area/list/Areas";
import Citas from "../views/setting/city/list/Citas";
import Company from "../views/setting/company/Company";

export default function MgerRouter() {
  return (
    <div className='container mt-3 pb-5'>
      <Switch>
        <Route path='/mger/home'>
          <HomeRole />
        </Route>
        <Route path='/mger/center'>
          <Center />
        </Route>

        <Route path='/mger/users'>
          <Users />
        </Route>
        <Route path='/mger/user/:id'>
          <User />
        </Route>

        <Route path='/mger/shops'>
          <Shops />
        </Route>
        <Route path='/mger/shop/:id'>
          <Shop />
        </Route>

        <Route path='/mger/orders'>
          <Orders />
        </Route>
        <Route path='/mger/order/:id'>
          <Order />
        </Route>
        <Route path='/mger/pds'>
          <Pds />
        </Route>
        <Route path='/mger/pd/:id'>
          <Pd />
        </Route>

        <Route path='/mger/brands'>
          <Brands />
        </Route>

        <Route path='/mger/categs'>
          <Categs />
        </Route>

        <Route path='/mger/setting'>
          <Setting />
        </Route>
        <Route path='/ower/company'>
          <Company />
        </Route>
        <Route path='/mger/nations'>
          <Nations />
        </Route>
        <Route path='/mger/areas'>
          <Areas />
        </Route>
        <Route path='/mger/citas'>
          <Citas />
        </Route>
        <Route path='/mger/reload'>
          <Reload />
        </Route>
        <Redirect to='/mger/home' />
      </Switch>
    </div>
  );
}

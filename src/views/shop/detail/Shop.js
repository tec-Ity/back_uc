import React, {useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { getObj_Prom} from '../../../js/api'

import  {getRolePath} from '../../../js/conf/confUser';
import NavBread from '../../../components/universal/navBread/NavBread'

import ShopBasic from './ShopBasic'
import ShopAreas from './ShopAreas'
import ShopProds from './ShopProds'
export default function Shop() {
        const rolePath = getRolePath();

        const {id} = useParams();
        const apiShop = `/Shop/${id}`;
        const [Shop, setShop] = useState({});
        const [Comp, setComp] = useState(1);

        const shopCallback = useCallback(
                () => {
                        getObj_Prom(apiShop, setShop);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                },[],
        )
        useEffect(() => {
                shopCallback();
                return () => setShop({});
        }, [shopCallback])
        const setKeyComp = (key) => {
                setComp(Number(key));
        }
        return (<>
                <NavBread activePage="ShopDetail">
                        <Link to={`/${rolePath}/shops`}>Shops</Link>
                </NavBread>
                <div>
                        <div className="form-inline my-3">
                                <button className="btn btn-outline-success mx-3" type="button" onClick={() => setKeyComp(1)}>Basic</button>
                                <button className="btn btn-outline-success mx-3" type="button" onClick={() => setKeyComp(2)}>Service Areas</button>
                                <button className="btn btn-outline-success mx-3" type="button" onClick={() => setKeyComp(3)}>Products</button>
                        </div>
                        {
                                Comp === 1
                                ? <ShopBasic Shop={Shop}/>
                                : Comp === 2
                                ? <ShopAreas/>
                                :<ShopProds/>
                        }
                </div>
        </>)
}

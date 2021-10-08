import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from "react-redux";

import  {getRolePath} from '../../../js/conf/confUser';
import NavBread from '../../../components/universal/navBread/NavBread'

import {
        getObject,
        selectObject,
        cleanField,
} from "../../../features/objectsSlice";

import ShopBasic from './ShopBasic'
import ShopAreas from './ShopAreas'
import ShopProds from './ShopProds'
export default function Shop() {
        const rolePath = getRolePath();
        const dispatch = useDispatch();
        const {id} = useParams();
        const flagSlice = 'shop';
        const flagField = 'object';
        const api = `/Shop/${id}`;
        const [Comp, setComp] = useState(1);

        const Shop = useSelector(selectObject(flagSlice));

        const setKeyComp = (key) => {
                setComp(Number(key));
        }
        useEffect(() => {
                dispatch(getObject({ flagSlice, api }));
                return () => {
                        dispatch(cleanField({ flagSlice, flagField }));
                };
        }, [api, dispatch]);
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

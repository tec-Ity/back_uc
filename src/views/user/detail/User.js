import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { getRolePath } from "../../../js/conf/confUser";

import UserPutModal from "../modal/UserPutModal";
import UserPwdModal from "../modal/UserPwdModal";
import NavBread from "../../../components/universal/navBread/NavBread";

import { selectUser } from "../../../features/authSlice";
import {
  getObject,
  deleteObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";

export default function User() {
  const hist = useHistory();
  const dispatch = useDispatch();

  const flagSlice = "user";
  const flagField = "object";
  const { id } = useParams();
  const api = `/user/${id}`;
  const api_delete = "/User/" + id;

  const curUser = useSelector(selectUser);
  const object = useSelector(selectObject(flagSlice));

  const rolePath = getRolePath();

  const [modalPut, setModalPut] = useState(false);
  const [modalPwd, setModalPwd] = useState(false);

  const deleteDB = () => {
    console.log(1);
    dispatch(deleteObject({ flagSlice, api: api_delete, id }));
    hist.replace(`/${rolePath}/users`);
  };

  useEffect(() => {
    dispatch(getObject({ flagSlice, api }));
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch]);
  return (
    <>
      <NavBread activePage={ <FormattedMessage id='navLabel-user' defaultMessage='user' /> }>
        <Link to={`/${rolePath}/users`}>
          <FormattedMessage id='navLabel-users' defaultMessage='users' />
        </Link>
      </NavBread>

      {
        // 数据正确
      object._id && String(object._id) === String(id) && (
        <div className='text-right'>
          {
            // 如果比自己等级低 可删除
          curUser._id !== object._id && (
            <>
            <button className='btn btn-danger mx-4' onClick={deleteDB}>
              <i className='bx bx-trash'></i>
            </button>
          <button className='btn btn-warning mx-3' onClick={() => setModalPwd(true)}> <i className='bx bx-lock-open'></i> </button>
          <UserPwdModal
            show={modalPwd}
            onHide={() => setModalPwd(false)}
            object={object}
            flagSlice={flagSlice}
          />
          </>
          )}

          <button className='btn btn-info' onClick={() => setModalPut(true)}> <i className='bx bx-edit-alt'></i> </button>
          <UserPutModal
            show={modalPut}
            onHide={() => setModalPut(false)}
            object={object}
            flagSlice={flagSlice}
          />
        </div>
      )}

      <div className='row mt-3'>
        <div className='col-4 col-md-2'> 登录账号: </div>
        <div className='col-8 col-md-10'> {object.code} </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4 col-md-2'> 用户姓名: </div>
        <div className='col-8 col-md-10'> {object.nome} </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4 col-md-2'> 电话: </div>
        {
          object.phone && <div className='col-8 col-md-10'> {object.phonePre}  {object.phone}</div>
        }
      </div>
      <div className='row mt-3'>
        <div className='col-4 col-md-2'> 用户角色: </div>
        <div className='col-8 col-md-10'> {object.role} </div>
        </div>
      <div className='row mt-3'>
        <div className='col-4 col-md-2'> 是否可用: </div>
        <div className='col-8 col-md-10'> {object.is_usable} </div>
        </div>
      <div className='row mt-3'>
        <div className='col-4 col-md-2'> 最近登录: </div>
        <div className='col-8 col-md-10'> {object.at_last_login} </div>
      </div>
        {object.Shop && (
        <div className='row mt-3'>
              <div className='col-4 col-md-2'> 所属店铺: </div>
              <div className='col-8 col-md-10'> {object.Shop.code} </div>
        </div>
        )}
    </>
  );
}

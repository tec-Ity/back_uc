import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { getRolePath } from "../../../js/conf/confUser";

import UserPutModal from "../modal/UserPutModal";
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

  const [modalShow, setModalShow] = useState(false);

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
      <NavBread
        activePage={
          <FormattedMessage id='navLabel-user' defaultMessage='user' />
        }>
        <Link to={`/${rolePath}/users`}>
          <FormattedMessage id='navLabel-users' defaultMessage='users' />
        </Link>
      </NavBread>
      {object._id && String(object._id) === String(id) && (
        <div className='text-right'>
          {curUser._id !== object._id && (
            <button className='btn btn-danger mx-4' onClick={deleteDB}>
              {" "}
              <i className='bx bx-trash'></i>{" "}
            </button>
          )}
          <button className='btn btn-info' onClick={() => setModalShow(true)}>
            {" "}
            <i className='bx bx-edit-alt'></i>{" "}
          </button>
          <UserPutModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            object={object}
            flagSlice={flagSlice}
          />
        </div>
      )}

      <div className='row'>
        <div className='col-4 col-md-2'> _id: </div>{" "}
        <div className='col-8 col-md-10'> {object._id} </div>
        <div className='col-4 col-md-2'> code: </div>{" "}
        <div className='col-8 col-md-10'> {object.code} </div>
        <div className='col-4 col-md-2'> nome: </div>{" "}
        <div className='col-8 col-md-10'> {object.nome} </div>
        <div className='col-4 col-md-2'> phonePre: </div>{" "}
        <div className='col-8 col-md-10'> {object.phonePre} </div>
        <div className='col-4 col-md-2'> phone: </div>{" "}
        <div className='col-8 col-md-10'> {object.phone} </div>
        <div className='col-4 col-md-2'> role: </div>{" "}
        <div className='col-8 col-md-10'> {object.role} </div>
        <div className='col-4 col-md-2'> is_blacklist: </div>{" "}
        <div className='col-8 col-md-10'> {object.is_blacklist} </div>
        <div className='col-4 col-md-2'> is_shelf: </div>{" "}
        <div className='col-8 col-md-10'> {object.is_shelf} </div>
        <div className='col-4 col-md-2'> is_usable: </div>{" "}
        <div className='col-8 col-md-10'> {object.is_usable} </div>
        <div className='col-4 col-md-2'> at_last_login: </div>{" "}
        <div className='col-8 col-md-10'> {object.at_last_login} </div>
        {object.Firm && (
          <>
            <div className='col-4 col-md-2'> Firm: </div>{" "}
            <div className='col-8 col-md-10'> {object.Firm.code} </div>
          </>
        )}
        {object.Shop && (
          <>
            <div className='col-4 col-md-2'> Shop: </div>{" "}
            <div className='col-8 col-md-10'> {object.Shop.code} </div>
          </>
        )}
      </div>
    </>
  );
}

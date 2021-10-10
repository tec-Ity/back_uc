import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import threshold from "../../../js/conf/threshold";
import { role_Arrs } from "../../../js/conf/confUser";

import SearchInput from "../../../components/universal/query/SearchInput";
import RowIpt from "../../../components/basic/RowIpt";
import UiCards from "../../../components/ui/UiCards";
import ShopCard from "../../../views/shop/ui/ShopCard";

import { putObject, selectObjects } from "../../../features/objectsSlice";

export default function UserPutModal(props) {
  const { flagSlice, show, onHide, object } = props; // 模板的显示隐藏
  const text_flow =
    window.innerWidth >= threshold.pc_mb ? "text-right" : "text-left";

  const dispatch = useDispatch();
  const curRole = parseInt(localStorage.getItem("role"));

  const flagSlice_Shops = "user_Shops";
  const api_Shops = "/Shops";
  const api = "/User/" + object._id;

  const [formdata, setFormdata] = useState({}); // 创建的数据

  const [farSearch_Shops, setfarSearch_Shops] = useState(); // 是否有店铺选项
  const [isShop, setIsShop] = useState(false); // 是否有店铺选项
  const Shops = useSelector(selectObjects(flagSlice_Shops));
  //
  const clickShopCard = (obj) => (e) => {
    setFormdata((pre) => ({ ...pre, Shop: obj._id }));
    setfarSearch_Shops(obj.code);
  };

  const iptFormdata = (type) => (e) =>
    setFormdata((pre) => ({ ...pre, [type]: e.target.value }));
  const matchSearchCode = (mCode) => {
    Shops.forEach((obj) => {
      if (obj.code === mCode.toUpperCase()) {
        setFormdata((pre) => ({ ...pre, Shop: obj._id }));
      } else {
        if (formdata.Shop) {
          const temp = { ...formdata };
          temp.Shop = null;
          setFormdata(temp);
        }
      }
    });
  };

  const roleFilterShops = (selRole) => {
    console.log(selRole);
    if (selRole > 100) {
      setIsShop(true);
    } else {
      setIsShop(false);
      setFormdata((pre) => ({ ...pre, Shop: "" }));
    }
  };
  const chgRole = () => (e) => {
    const selRole = e.target.value;
    // console.log(selRole)
    roleFilterShops(selRole);
    setFormdata((pre) => ({ ...pre, role: selRole }));
  };

  const putSubmit = () => {
    dispatch(putObject({ flagSlice, api, data: { obj: formdata } }));
    onHide();
  };
  
  //init
  useEffect(() => {
    const { code, nome, phonePre, phone, role } = object;
    const Shop = object.Shop ? object.Shop._id : null;
    if (object.Shop) {
      setfarSearch_Shops(object.Shop.code);
      console.log(object.Shop.code);
    }
    setFormdata({ code, nome, phonePre, phone, role, Shop });
    roleFilterShops(formdata.role);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(formdata.role)
  //   console.log(farSearch_Shops)
  return (
    <Modal
      onHide={onHide}
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <FormattedMessage id='update' defaultMessage='update' />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <RowIpt rowClass={`my-3 ${text_flow}`}>
            <input
              type='text'
              className='form-control'
              id='code-ipt'
              onChange={iptFormdata("code")}
              label='Codice'
              value={formdata.code}
            />
            <input
              type='text'
              className='form-control'
              id='nome-ipt'
              onChange={iptFormdata("nome")}
              label='Name'
              value={formdata.nome}
            />
          </RowIpt>

          <RowIpt rowClass={`my-3 ${text_flow}`}>
            <input
              type='text'
              className='form-control'
              id='phonePre-ipt'
              onChange={iptFormdata("phonePre")}
              colnum='col-4 col-md-2'
              label='Phone'
              value={formdata.phonePre}
            />
            <input
              type='text'
              className='form-control'
              onChange={iptFormdata("phone")}
              colnum='col-8'
              value={formdata.phone}
            />
          </RowIpt>
          {localStorage.getItem("_id") !== object._id && (
            <>
              <RowIpt rowClass={`my-3 ${text_flow}`}>
                <select
                  className='form-control'
                  id='role-ipt'
                  data-style='btn-info'
                  onChange={chgRole()}
                  label='Role'
                  defaultValue={formdata.role}>
                  <option>please select</option>
                  {role_Arrs.map((item) => {
                    return (
                      item > curRole && (
                        <FormattedMessage id={`role-${item}`} key={item}>
                          {(message) => <option value={item}>{message}</option>}
                        </FormattedMessage>
                      )
                    );
                  })}
                </select>
              </RowIpt>
              {console.log(isShop)}
              {isShop && (
                <>
                  <div className={`row ${text_flow}`}>
                    <label
                      htmlFor='Shop-ipt'
                      className={`col-md-2 col-form-label ${
                        formdata.Shop && "text-success"
                      }`}>
                      {" "}
                      Shop
                    </label>
                    <div className='col-md-10'>
                      <SearchInput
                        flagSlice={flagSlice_Shops}
                        api={api_Shops}
                        farSearch={farSearch_Shops}
                        matchSearchCode={matchSearchCode}
                      />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>
                      <UiCards
                        cols='col-6 col-md-4 col-xl-3 mt-2'
                        matchId={formdata.Shop}
                        propsCard={ShopCard}
                        objects={Shops}
                        clickEvent={clickShopCard}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          <FormattedMessage id='close' />
        </Button>
        <Button variant='primary' onClick={putSubmit}>
          {" "}
          <FormattedMessage id='confirm' />{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

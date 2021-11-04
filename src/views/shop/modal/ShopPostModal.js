import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import threshold from "../../../js/conf/threshold";

import RowIpt from "../../../components/basic/RowIpt";
import UiCards from "../../../components/ui/UiCards";
import CitaCard from "../../../views/setting/city/ui/CitaCard";
import SearchInput from "../../../components/universal/query/SearchInput";

import {
  selectObjects,
  postObject,
  setQueryFixed,
} from "../../../features/objectsSlice";

export default function ShopPostModal(props) {
  const { flagSlice, show, onHide } = props; // 模板的显示隐藏
  const text_flow =
    window.innerWidth >= threshold.pc_mb ? "text-right" : "text-left";

  const dispatch = useDispatch();

  const flagSlice_Citas = "shop_Citas";
  const api_Citas = "/Citas";
  const api = "/Shop";

  const [formdata, setFormdata] = useState({
    code: "",
    nome: "",
    addr: "",
    zip: "",
    price_ship: "",
    Cita: "",
  }); // 创建的数据

  const [farQuery_Citas, setfarQuery_Citas] = useState({}); // 是否有店铺选项
  const Citas = useSelector(selectObjects(flagSlice_Citas));
  //
  const clickCitaCard = (obj) => (e) => {
    setFormdata((pre) => ({ ...pre, Cita: obj._id }));
    setfarQuery_Citas({ key: "search", val: obj.code });
  };

  const iptFormdata = (type) => (e) =>
    setFormdata((pre) => ({ ...pre, [type]: e.target.value }));

  // 判断所输入的code是否与城市相同
  const matchSearchCode_Cita = (mCode) => {
    let i = 0;
    for (; i < Citas.length; i++) {
      if (Citas[i].code === mCode.toUpperCase()) break;
    }
    if (i < Citas.length) {
      setFormdata((pre) => ({ ...pre, Cita: Citas[i]._id }));
    } else {
      if (formdata.Cita) {
        const temp = { ...formdata };
        temp.Cita = null;
        setFormdata(temp);
      }
    }
  };

  const postSubmit = () => {
    const formData = new FormData();
    formData.append("obj", JSON.stringify(formdata));
    dispatch(postObject({ flagSlice, api, data: formData }));
    //     dispatch(postObject({ flagSlice, api, data: { obj: formdata } }));
    onHide();
  };
  // 为搜索Citas做条目数限制
  const queryFixed_Citas = "&pagesize=8";
  useEffect(() => {
    dispatch(
      setQueryFixed({
        flagSlice: flagSlice_Citas,
        queryFixed: queryFixed_Citas,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      onHide={onHide}
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <FormattedMessage id='create' defaultMessage='Create' />
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
              placeholder='字母和数字的4位'
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
              id='zip-ipt'
              onChange={iptFormdata("zip")}
              label='邮编'
              value={formdata.zip}
            />
            <input
              type='text'
              className='form-control'
              id='price_ship-ipt'
              onChange={iptFormdata("price_ship")}
              label='运费'
              value={formdata.price_ship}
            />
          </RowIpt>

          <RowIpt rowClass={`my-3 ${text_flow}`}>
            <input
              type='text'
              className='form-control'
              id='addr-ipt'
              onChange={iptFormdata("addr")}
              label='Indirizzo'
              value={formdata.addr}
            />
          </RowIpt>
          {
            /*
			<hr/>
			<div className="row">
				<label className='col-md-2 col-form-label '> 主店 </label>
				<div className="col-md-4">
					<input type="radio"  id="yes_main" name="drone" value="1"></input>
					<label htmlFor="yes_main">yes</label>
					<input type="radio"  id="no_main" name="drone" value="0" checked></input>
					<label htmlFor="no_main">no</label>
				</div>
			</div>
			<hr/>
			*/
            // is_main: {type: Boolean, default: false},	// 是否为精品店
            // is_boutique: {type: Boolean, default: false},	// 是否为精品店
            // is_usable: { type: Boolean, default: true },	// 是否可用
            // sort: Number,									// 排序
          }
          <div className={`row ${text_flow}`}>
            <label
              className={`col-md-2 col-form-label ${
                formdata.Cita && "text-success"
              }`}>
              Citta
            </label>
            <div className='col-md-10'>
              <SearchInput
                flagSlice={flagSlice_Citas}
                api={api_Citas}
                farSearch={farQuery_Citas?.val}
                matchSearchCode={matchSearchCode_Cita}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-10'>
              <UiCards
                cols='col-6 col-md-4 col-xl-3 mt-2'
                propsCard={CitaCard}
                objects={Citas}
                matchId={formdata.Cita}
                clickEvent={clickCitaCard}
              />
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          <FormattedMessage id='close' defaultMessage='Close' />
        </Button>
        <Button variant='primary' onClick={postSubmit}>
          <FormattedMessage id='confirm' defaultMessage='Confirm' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

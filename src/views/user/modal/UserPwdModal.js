import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import threshold from "../../../js/conf/threshold";

import RowIpt from "../../../components/basic/RowIpt";

import { putObject } from "../../../features/objectsSlice";

export default function UserPutModal(props) {
  const { flagSlice, show, onHide, object } = props; // 模板的显示隐藏
  const text_flow =
    window.innerWidth >= threshold.pc_mb ? "text-right" : "text-left";

  const dispatch = useDispatch();
  const curRole = parseInt(localStorage.getItem("role"));

  const api = "/User/" + object._id;

  const [formdata, setFormdata] = useState({pwd: '', pwdConfirm: ''}); // 创建的数据

  const iptFormdata = (type) => (e) =>{
                console.log(type)
                setFormdata((pre) => ({ ...pre, [type]: e.target.value }));
  }

  const putSubmit = () => {
    dispatch(putObject({ flagSlice, api, data: { password: formdata } }));
    setFormdata({pwd: '', pwdConfirm: ''})
    onHide();
  };

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
          {
            curRole >= object.role && (
              <RowIpt rowClass={`my-3 ${text_flow}`}>
                <input type='text' className='form-control' id='pwdOrg-ipt' onChange={iptFormdata("pwdOrg")} label='原密码' value={formdata.pwdOrg} />
              </RowIpt>
            )
          }
          <RowIpt rowClass={`my-3 ${text_flow}`}>
            <input type='text' className='form-control' id='pwd-ipt' onChange={iptFormdata("pwd")} label='新密码' value={formdata.pwd} />
          </RowIpt>
        <RowIpt rowClass={`my-3 ${text_flow}`}>
            <input type='text' className='form-control' id='pwdConfirm-ipt' onChange={iptFormdata("pwdConfirm")} label='确认密码' value={formdata.pwdConfirm} />
          </RowIpt>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          <FormattedMessage id='close' />
        </Button>
        <Button variant='primary' onClick={putSubmit}>
          <FormattedMessage id='confirm' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

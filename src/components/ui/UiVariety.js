import React, {useState} from 'react'

import UiCards from './UiCards';
import UiRows from './UiRows';

import { FormattedMessage } from 'react-intl'; 

export default function UiVariety(props) {
        const  styleUi  = {
                init: "card",
                arr: ['card', 'row'],
        }
        const [keyUi, setKeyUi] = useState(styleUi.init);
        const [activeBtns, setActiveBtns] = useState(['btn-success', 'btn-outline-success']);
        const { propsCard, UiRow, objects, clickEvent } = props;
        const changeUi = ( iBtn) => {
                // 变化样式组件
                setKeyUi(styleUi.arr[iBtn]);
                // 改变按钮样式
                const btns = [];
                activeBtns.forEach((item, i) => btns.push((i === iBtn) ? "btn-success": "btn-outline-success") )
                setActiveBtns(btns)
        }
        const componentUI = () => {
                switch (keyUi) {
                        case styleUi.arr[0]:
                                return <UiCards propsCard={propsCard}   objects={objects} clickEvent={clickEvent} />
                        case styleUi.arr[1]:
                                return <UiRows  UiRow={UiRow} objects={objects} clickEvent={clickEvent} />                
                        default:
                                return <div> Not exist this UI </div>
                }
        }
        return (
                <>
                        <button className={`btn  mx-3 ${activeBtns[0]}`} onClick={() => changeUi(0)}>
                                <FormattedMessage
                                        id='card'
                                        defaultMessage='card'
                                />
                        </button>
                        <button className={`btn  mx-3 ${activeBtns[1]}`} onClick={() => changeUi(1)}>
                                <FormattedMessage
                                        id='list'
                                        defaultMessage='list'
                                />
                        </button>
                        <div className="mt-5">
                                { componentUI() }
                        </div>
                </>
        )
}

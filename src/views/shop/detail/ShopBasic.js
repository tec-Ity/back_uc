import React from 'react'
import {get_DNS} from '../../../js/api'

export default function ShopBasic(props) {
        return (
                <div>
                        ShopBasic...
                        <img alt={props.Shop.code} src={`${get_DNS()}${props.Shop.img_url}`} />
                </div>
        )
}

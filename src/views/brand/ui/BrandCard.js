import React from 'react'
import {get_DNS} from '../../../js/api'

export default function BrandCard(props) {
        const { object, clickEvent } = props;
        let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
        if(object?.img_url) {
                img_url = get_DNS()+object.img_url;
        } else if(object?.img_urls?.length > 0) {
                img_url = get_DNS()+object.img_urls[0];
        }
        return (<>
                {
                        object
                        ? <div className="card"  onClick={clickEvent&&clickEvent(object)}>
                                <img 
                                        src={img_url}
                                        className="img-neat" 
                                        alt={object.code}
                                        style={{width: "100px",height:"100px"}}
                                />
                                <div className="card-body">
                                        <h5 className="card-title">{object.code}</h5>
                                        <p className="card-text">{object.nome}</p>
                                        <p className="card-text">{object.price}</p>
                                </div>
                        </div>
                        :<h3 className="text-danger"> BrandCard parameter Error! </h3>
                }
        </>)
}

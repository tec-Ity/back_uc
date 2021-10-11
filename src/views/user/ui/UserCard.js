import React from 'react'
import {get_DNS} from '../../../js/api'
import { FormattedMessage } from 'react-intl'; 

export default function UserCard(props) {
        const { object, clickEvent } = props;
        let img_url = `${process.env.PUBLIC_URL}/img/icon/userProfile.svg`;
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
                                        <h5 className="card-title">{object.code+(object.nome && `[${object.nome}]`)}</h5>
                                        <p className="card-text">
                                                <FormattedMessage
                                                        id={`role-${object.role}`}
                                                        defaultMessage={object.role}
                                                />
                                        </p>
                                        <p className="card-text">{object.Shop?.code}</p>
                                </div>
                        </div>
                        :<h3 className="text-danger"> UserCard parameter Error! </h3>
                }
        </>)
}

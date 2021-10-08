import {get_DNS} from '../../../js/api'
import { FormattedMessage } from 'react-intl'; 

export default function UserRow(props) {

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
                        ? <div className="row mt-5 align-middle" key={object._id}>
                                <div className="col-2 col-md-1" onClick={clickEvent&&clickEvent(object)}>
                                        <img alt={object.code} src={img_url} className="img-neat" style={{width: "100%",height:"70px"}} />
                                </div>
                                <div className="col-10 col-md-11 border rounded">
                                        <div className="row">
                                                <div className="mt-3 col-4 col-md-2 text-primary" onClick={clickEvent&&clickEvent(object)}>{object.code}</div>
                                                <div className="mt-3 col-4 col-md-2">{object.nome}</div>
                                                <div className="mt-3 col-4 col-md-2">
                                                        <FormattedMessage
                                                                id={`role-${object.role}`}
                                                                defaultMessage={object.role}
                                                        />
                                                </div>
                                                <div className="mt-3 col-4 col-md-2">{object.Shop?.code}</div>
                                                <div className="mt-3 col-8 col-md-4">{object.phone && object.phonePre+' '+object.phone}</div>
                                        </div>
                                </div>
                        </div>
                        : <h3 className="text-danger"> UserRow parameter Error! </h3>
                }

        </>)
}

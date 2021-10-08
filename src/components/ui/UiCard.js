import React from 'react'
import {get_DNS} from '../../js/api'

export default function UiCard(props) {
        const { object, clickEvent, matchId } = props;

        let card = "card";
        if(object && matchId && (String(object._id) === String(matchId) ) ) card = "card bg-info";

        let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
        if(object?.img_url) {
                img_url = get_DNS()+object.img_url;
        } else if(object?.img_urls?.length > 0) {
                img_url = get_DNS()+object.img_urls[0];
        }
        const render = () => {
                if(!object) return <h3 className="text-danger"> UiCard parameter Error! : [object] </h3>;
                if(!object.title) return <h3 className="text-danger"> UiCard parameter Error! : [object.title] </h3>;
                return <div className={card}  onClick={clickEvent&&clickEvent(object)}>
                        <img 
                                src={img_url}
                                className="img-neat" 
                                alt={object.code}
                                style={{width: "100px",height:"100px"}}
                        />
                        <div className="card-body">
                                <h5 className="card-title">{object.title}</h5>
                                <p className="card-text">{object.desp}</p>
                                <p className="card-text">{object.note}</p>
                        </div>
                </div>
        }
        return (<>
                {
                        render()
                }
        </>)
}

import React from 'react'
import UiCard from './UiCard';

export default function UiCards(props) {
        const {cols, propsCard, objects, matchId, clickEvent } = props;
        const Card = propsCard? propsCard: UiCard;
        return (<>
                <div className="row">
                        {
                                objects && Card
                                ? objects.map(object => {
                                        return object 
                                        ?   <div className={cols? cols:"col-6 col-md-4 col-lg-3 mt-3"} key={object._id} >
                                                        <Card 
                                                                object={object}
                                                                clickEvent={clickEvent}
                                                                matchId={matchId}
                                                        />
                                                </div>
                                        : <div>Date Error</div>
                                })
                                : <h3 className="text-danger"> UiCards Component params Error! </h3>
                        }        
                </div>
        </>)
}

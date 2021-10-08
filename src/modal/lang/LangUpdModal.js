import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";

import { getRolePath } from "../../js/conf/confUser";
import {LangConf, systemLangs } from "../../js/lang/confLang";
import { FormattedMessage } from 'react-intl'; 

export default function LangUpdModal(props) {
        const rolePaht = getRolePath();
        const hist = useHistory();
        const {onHide, show, lang, setLang} = props;

        const storeLang = (item) => (e) => {
                localStorage.setItem("lang", item);
                // window.location.reload();
                setLang(localStorage.getItem('lang'));
                hist.push(`/${rolePaht}/reload`)
                onHide();
        }

	return (
		<Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
                                        <FormattedMessage
                                                id='LangUpdModal-title'
                                                defaultMessage='LangUpdModal-title'
                                        />
                                </Modal.Title>
			</Modal.Header>

			<Modal.Body>
                                <div className="row text-center">
                                {
                                        systemLangs.map(item => {
                                                return <div className="col-3 col-md-2" key={item} >
                                                        {
                                                                item === lang
                                                                ?<button className="btn btn-success">{LangConf[item]}</button>
                                                                :<button className="btn btn-outline-success" onClick={storeLang(item)}>{LangConf[item]}</button>
                                                        }
                                                </div>
                                        })
                                
                                }
                        </div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary"onClick={onHide}>
                                        <FormattedMessage
                                                id='close'
                                                defaultMessage='close'
                                        />
                                </Button>
			</Modal.Footer>
		</Modal>
	);
}
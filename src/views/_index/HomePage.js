import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from 'react-redux';

import { reducerLogin} from '../../features/authSlice';

export default function HomePage() {
	const hist = useHistory();
	const dispatch = useDispatch();
	const [formdata, setFormdata] = useState({code:"", pwd:""});

	const chgFormdata = type => e => setFormdata(pre => ({...pre, [type]: e.target.value}));

	const login = () => {
		dispatch(reducerLogin({formdata}));
		hist.replace('/')
	}

	return (
		<div className="container">
			<div className="my-3 row">
				<label htmlFor="code-ipt" className="col-sm-2 col-form-label">code</label>
				<div className="col-sm-10">
					<input type="text"  className="form-control" id="code-ipt" onChange={chgFormdata('code')} value={formdata.code} />
				</div>
			</div>
			<div className="mb-3 row">
				<label htmlFor="pwd-ipt" className="col-sm-2 col-form-label">Password</label>
				<div className="col-sm-10">
					<input type="password" className="form-control" id="pwd-ipt" onChange={chgFormdata('pwd')} value={formdata.pwd} />
				</div>
			</div>
			<div className="mb-3 row">
			<div className="col-sm-2"></div>
				<div className="col-sm-10 text-right">
					<button className="btn btn-primary btn-block" onClick={login}> Login </button>
				</div>
			</div>
		</div>
	)
}

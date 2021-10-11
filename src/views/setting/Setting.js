import { Link } from "react-router-dom"
import { getRolePath } from "../../js/conf/confUser";

export default function Setting() {
        const rolePath = getRolePath();

        return (
                <>
                        <Link to={`/${rolePath}/nations`}>  <span style={{fontSize: '24px'}}>Nation List</span> </Link>
                        <br/>
                        <Link to={`/${rolePath}/areas`}>  <span style={{fontSize: '24px'}}>Area List</span> </Link>
                        <br/>
                        <Link to={`/${rolePath}/Citas`}>  <span style={{fontSize: '24px'}}>City List</span> </Link>
                </>
        )
}

import { Link } from "react-router-dom"
import { getRolePath } from "../../js/conf/confUser";

export default function Setting() {
        const rolePath = getRolePath();

        return (
                <>
                        <Link to={`/${rolePath}/Citas`}>  <span style={{fontSize: '24px'}}>City List</span> </Link>
                </>
        )
}

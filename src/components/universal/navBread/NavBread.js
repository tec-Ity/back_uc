import "./NavBread.css";
import { Link } from "react-router-dom";
import { getRolePath } from "../../../js/conf/confUser";
import { FormattedMessage } from "react-intl";

export default function NavBread(props) {
  const { children, activePage } = props;
  const rolePath = getRolePath();
  return (
    <>
      <nav className='bradcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to={`/${rolePath}`}>
              <FormattedMessage id='homepage' defaultMessage='homepage' />
            </Link>
          </li>
          {children === undefined ? (
            <></>
          ) : Array.isArray(children) ? (
            children?.map((item, index) => {
              return (
                <li className='breadcrumb-item' key={`breadcrumb}-${index}`}>
                  {item}{" "}
                </li>
              );
            })
          ) : (
            <li className='breadcrumb-item'>{children} </li>
          )}
          <li className='breadcrumb-item active' aria-current='page'>
            {activePage}
          </li>
        </ol>
      </nav>
    </>
  );
}

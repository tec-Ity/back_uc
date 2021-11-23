import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectLinks, reducerLogout } from "../features/authSlice";

export default function AppHeaderMb() {
  const hist = useHistory();
  const dispatch = useDispatch();

  const curUser = useSelector(selectUser);
  const roleLinks = useSelector(selectLinks);

  const logout = () => {
    dispatch(reducerLogout());
    hist.replace("/home");
  };

  return (
    <>
      {/* <div style={{height: "61px", backgroundColor: "#000000"}}></div> */}
      <div style={{ height: "61px" }}></div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <img
              alt=''
              src={`${process.env.PUBLIC_URL}/img/icon/dabai.jpeg`}
              style={{ height: "35px" }}
            />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'>
            <div className='offcanvas-header'>
              <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                Menu
              </h5>
              <button
                type='button'
                className='btn-close text-reset'
                data-bs-dismiss='offcanvas'
                aria-label='Close'></button>
            </div>
            <div className='offcanvas-body'>
              <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                {curUser && curUser.code && (
                  <>
                    {roleLinks?.map((link) => {
                      return (
                        <li
                          key={link.label}
                          className='nav-item '
                          data-bs-toggle='offcanvas'
                          data-bs-target='#offcanvasNavbar'
                          aria-controls='offcanvasNavbar'>
                          <NavLink className='nav-link' to={link.to}>
                            <i
                              className={link.icon}
                              style={{ position: "relative" }}>
                              {link.to.split("/")[2] === "orders" && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "-2px",
                                    left: "-2px",
                                    height: "7px",
                                    width: "7px",
                                    background: "red",
                                    borderRadius: "100px",
                                  }}></div>
                              )}
                            </i>
                            {link.label}
                          </NavLink>
                        </li>
                      );
                    })}
                    <li className='nav-item'>
                      <NavLink className='text-dark nav-link' to='/center'>
                        center:{curUser.nome || curUser.code}
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                      <div className='text-danger  nav-link' onClick={logout}>
                        logout
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

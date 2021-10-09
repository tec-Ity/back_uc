import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";

import { selectUser, selectLinks, reducerLogout } from "../features/authSlice";

import { getRolePath } from "../js/conf/confUser";
import threshold from "../js/conf/threshold";
import LangUpdModal from "./LangUpdModal";
import "./AppHeaderPc.css";

export default function AppHeaderPc(props) {
  const hist = useHistory();
  const dispatch = useDispatch();

  const curUser = useSelector(selectUser);
  const roleLinks = useSelector(selectLinks);

  const [spreadbar, setSpreadbar] = useState("");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const ongoingOrderCount = useSelector((state) => {
    return state.objects.ongoingOrderCount;
  });
  const logout = () => {
    dispatch(reducerLogout());
    hist.replace("/home");
  };
  const togSidebar = () => setSpreadbar(spreadbar === "" ? "spreadbar" : "");
  const hideSidebar = () => {
    /* setSpreadbar('') */
  };

  const { lang, setLang } = props;
  const [modalShow, setModalShow] = useState(false);
  const showModal = () => {
    setModalShow(true);
  };

  useEffect(() => {
    window.addEventListener("resize", () => setInnerWidth(window.innerWidth));
    return () => {
      setSpreadbar("");
      setInnerWidth("");
    };
  }, []);

  return (
    <div className={`sidebar ${spreadbar}`}>
      <div className='logo_content'>
        <div className='logo'>
          <i className='bx bx-doughnut-chart'></i>
          <div className='logo_name'>GC</div>
        </div>
        <i className='bx bx-menu' id='btn' onClick={togSidebar}></i>
      </div>
      <ul className='nav_list'>
        {/* <li>
					<i className='bx bx-search' onClick={togSidebar}></i>
					<input type="text" className="links_name " placeholder="Search..." />
					{
						innerWidth >= threshold.tooltip && <span className="tooltip">Search</span>
					}
				</li> */}
        {roleLinks &&
          roleLinks.map((link, index) => {
            return (
              <li key={`headerNavLink${index}`} onClick={hideSidebar}>
                <NavLink to={link.to} className=''>
                  <i className={link.icon}>
                    {link.to.split("/")[2] === "orders" &&
                      ongoingOrderCount > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "30px",
                            height: "10px",
                            width: "10px",
                            background: "red",
                            borderRadius: "100px",
                          }}></div>
                      )}
                  </i>
                  <span className='links_name'>
                    <FormattedMessage
                      id={`navLabel-${link.label}`}
                      defaultMessage={link.label}
                    />
                    {link.to.split("/")[2] === "orders" &&
                      ongoingOrderCount > 0 && (
                        <span style={{ color: "red" }}>
                          &nbsp;{"(" + ongoingOrderCount + ")"}
                        </span>
                      )}
                  </span>
                </NavLink>
                {innerWidth >= threshold.tooltip && (
                  <span className='tooltip'>
                    <FormattedMessage
                      id={`navLabel-${link.label}`}
                      defaultMessage={link.label}
                    />
                  </span>
                )}
              </li>
            );
          })}
      </ul>
      {curUser && curUser.code && (
        <div className='profile_content'>
          <div className='profile'>
            <div className='profile_details'>
              <NavLink to={`/${getRolePath()}/center`}>
                <img
                  src={`${process.env.PUBLIC_URL}/dabai.jpeg`}
                  alt='avatar'
                />
              </NavLink>
              <div className='name_job' onClick={showModal}>
                <div className='name'>
                  {curUser.nome || curUser.code} &nbsp;
                  <FormattedMessage
                    id={`role-${localStorage.getItem("role")}`}
                    defaultMessage={localStorage.getItem("role")}
                  />
                </div>
                <div className='job'>
                  <FormattedMessage id='curLang' defaultMessage='language' />
                </div>
              </div>
              <LangUpdModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                lang={lang}
                setLang={(newLang) => setLang(newLang)}
              />
            </div>
            <i className='bx bx-log-out' id='log_out' onClick={logout}></i>
          </div>
        </div>
      )}
    </div>
  );
}

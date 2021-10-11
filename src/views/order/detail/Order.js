import { Container } from "@mui/material";
import React from "react";
import NavBread from "../../../components/universal/navBread/NavBread";
import { getRolePath } from "../../../js/conf/confUser";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
const rolePath = getRolePath();
const useStyle = makeStyles({
        
})
export default function Order() {
  return (
    <Container>
      {/* bread */}
      <NavBread activePage='OrderDetail'>
        <Link to={`/${rolePath}/orders`}>Orders</Link>
      </NavBread>
      {/* order status */}

      {/* order info */}
      {/* prods info */}
      {/* ship info */}
      {/* control btns */}
    </Container>
  );
}


import { Grid } from "@mui/material";
import ListPageHeader from "../../components/basic/ListPageHeader";
import { getRolePath } from "../../js/conf/confUser";
import countryIcon from "../../components/icon/CountryIcon.svg";
import regionIcon from "../../components/icon/RegionIcon.svg";
import cityIcon from "../../components/icon/cityIcon.svg";
import { useHistory } from "react-router";
import CusSettingCart from "../../components/basic/CusSettingCard";
const links = [{ label: "主页", to: "/home" }, { label: "设置" }];
export default function Setting() {
  const rolePath = getRolePath();
  const hist = useHistory();
  return (
    <>
      <ListPageHeader links={links} showAddIcon={false} />
      <Grid container justifyContent='space-around'>
        <Grid container item xs={4}>
          <CusSettingCart
            title='PAESI'
            img={countryIcon}
            handleClick={() => hist.push(`/${rolePath}/nations`)}
          />
        </Grid>
        <Grid container item xs={4}>
          <CusSettingCart
            title='REGIONI'
            img={regionIcon}
            handleClick={() => hist.push(`/${rolePath}/areas`)}
          />
        </Grid>
        <Grid container item xs={4}>
          <CusSettingCart
            title='CITTA'
            img={cityIcon}
            handleClick={() => hist.push(`/${rolePath}/citas`)}
          />
        </Grid>
      </Grid>

      {/* <Link to={`/${rolePath}/nations`}>
        <span style={{ fontSize: "24px" }}>Nation List</span>
      </Link>
      <br />
      <Link to={`/${rolePath}/areas`}>
        <span style={{ fontSize: "24px" }}>Area List</span>
      </Link>
      <br />
      <Link to={`/${rolePath}/Citas`}>
        <span style={{ fontSize: "24px" }}>City List</span>
      </Link> */}
    </>
  );
}

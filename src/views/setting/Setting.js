import { Grid } from "@mui/material";
import ListPageHeader from "../../components/basic/ListPageHeader";
import { getRolePath } from "../../js/conf/confUser";
import { default as CountryIcon } from "../../components/icon/CountryIcon.svg";
import { default as RegionIcon } from "../../components/icon/RegionIcon.svg";
import { default as CityIcon } from "../../components/icon/cityIcon.svg";
import { useHistory } from "react-router";
import CusSettingCart from "../../components/basic/CusSettingCard";
const links = [{ label: "主页", to: "/home" }, { label: "设置" }];
export default function Setting() {
  const rolePath = getRolePath();
  const hist = useHistory();
  return (
    <>
      <ListPageHeader links={links} showAddIcon={false} showSearch={false} />
      <Grid container rowSpacing={3}>
        <Grid container item xs={4}>
          <CusSettingCart
            title='COMPANY'
            img={CountryIcon}
            handleClick={() => hist.push(`/${rolePath}/company`)}
          />
        </Grid>
        <Grid container item xs={4}>
          <CusSettingCart
            title='PAESI'
            img={CountryIcon}
            handleClick={() => hist.push(`/${rolePath}/nations`)}
          />
        </Grid>
        <Grid container item xs={4}>
          <CusSettingCart
            title='REGIONI'
            img={RegionIcon}
            handleClick={() => hist.push(`/${rolePath}/areas`)}
          />
        </Grid>
        <Grid container item xs={4}>
          <CusSettingCart
            title='CITTA'
            img={CityIcon}
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

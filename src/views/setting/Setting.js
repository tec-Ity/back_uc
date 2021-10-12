import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ListPageHeader from "../../components/basic/ListPageHeader";
import { getRolePath } from "../../js/conf/confUser";
import countryIcon from "../../components/icon/CountryIcon.svg";
import regionIcon from "../../components/icon/RegionIcon.svg";
import cityIcon from "../../components/icon/cityIcon.svg";
import { useHistory } from "react-router";
const links = [{ label: "主页", to: "/home" }, { label: "设置" }];
export default function Setting() {
  const rolePath = getRolePath();
  const hist = useHistory();
  return (
    <>
      <ListPageHeader links={links} showAddIcon={false} />
      <Grid container justifyContent='space-around'>
        <Grid container item xs={3}>
          <Card
            sx={{ width: "180px", height: "220px", cursor: "pointer" }}
            onClick={() => hist.push(`/${rolePath}/nations`)}>
            <Grid container sx={{ height: "100%" }} alignContent='space-evenly'>
              <Grid container item xs={12} justifyContent='center'>
                <img
                  src={countryIcon}
                  alt='country'
                  style={{ display: "block", width: "110px", height: "130px" }}
                />
              </Grid>
              <Grid container item xs={12} justifyContent='center'>
                <div
                  style={{
                    height: "1px",
                    width: "80%",
                    backgroundColor: "#000",
                  }}></div>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent='center'
                sx={{ fontWeight: "bold" }}>
                PAESI
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid container item xs={3}>
          <Card
            sx={{ width: "180px", height: "220px", cursor: "pointer" }}
            onClick={() => hist.push(`/${rolePath}/areas`)}>
            <Grid container sx={{ height: "100%" }} alignContent='space-evenly'>
              <Grid container item xs={12} justifyContent='center'>
                <img
                  src={regionIcon}
                  alt='country'
                  style={{ display: "block", width: "110px", height: "130px" }}
                />
              </Grid>
              <Grid container item xs={12} justifyContent='center'>
                <div
                  style={{
                    height: "1px",
                    width: "80%",
                    backgroundColor: "#000",
                  }}></div>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent='center'
                sx={{ fontWeight: "bold" }}>
                REGIONI
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid container item xs={3}>
          <Card
            sx={{ width: "180px", height: "220px", cursor: "pointer" }}
            onClick={() => hist.push(`/${rolePath}/Citas`)}>
            <Grid container sx={{ height: "100%" }} alignContent='space-evenly'>
              <Grid container item xs={12} justifyContent='center'>
                <img
                  src={cityIcon}
                  alt='country'
                  style={{ display: "block", width: "110px", height: "130px" }}
                />
              </Grid>
              <Grid container item xs={12} justifyContent='center'>
                <div
                  style={{
                    height: "1px",
                    width: "80%",
                    backgroundColor: "#000",
                  }}></div>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent='center'
                sx={{ fontWeight: "bold" }}>
                CITTÀ
              </Grid>
            </Grid>
          </Card>
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

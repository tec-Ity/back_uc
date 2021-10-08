import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import { getObjects, setQuery } from "../../../../features/objectsSlice";
const useStyle = makeStyles({});
export default function ShopFilter(props) {
  const { flagSlice, objects, ...popProps } = props;
  const classes = useStyle();
  const dispatch = useDispatch();
  const [selectedShop, setSelectedShop] = useState("");
  const Shops = useSelector((state) => state.objects.Shops?.objects);
  const handleClick = (shop) => () => {
    setSelectedShop(shop);
    dispatch(
      setQuery({
        flagSlice,
        query: {
          key: "Shops",
          val: shop,
        },
      })
    );
  };
  useEffect(() => {
    dispatch(getObjects({ flagSlice: "Shops", api: "/Shops" }));
  }, [dispatch, flagSlice]);
  //   console.log(Shops)
  return (
    <Popover {...popProps}>
      <List className={classes.root}>
        {Shops?.map((shop, index) => {
          return (
            <React.Fragment key={shop._id}>
              <ListItemButton
                onClick={handleClick(shop._id)}
                selected={shop._id === selectedShop}>
                <ListItemText>{shop.code}</ListItemText>
              </ListItemButton>
              <Divider variant='middle' />
            </React.Fragment>
          );
        })}

        <ListItemButton
          onClick={handleClick("")}
          selected={selectedShop === ""}>
          <ListItemText>ALL</ListItemText>
        </ListItemButton>
      </List>
    </Popover>
  );
}

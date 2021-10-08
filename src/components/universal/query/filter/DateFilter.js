import React, { useState, useEffect } from "react";
import {
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  ListItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../../features/objectsSlice";
import moment from "moment";
const useStyle = makeStyles({
  root: { width: "250px" },
  exactDate: { lineHeight: "100%" },
  intervalDate: {},
});

export default function DateFilter(props) {
  const { flagSlice, ...popProps } = props;
  const dispatch = useDispatch();
  const [selDate, setSelDate] = useState(0);
  const [exactDate, setExactDate] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const classes = useStyle();
  const handleSelPeriod = (period) => () => {
    // console.log(period);
    setSelDate(period);
    setExactDate(null);
    setStartDate(null);
    setEndDate(null);
    if (period > 0) {
      let now = new Date();
      let month = now.getMonth();
      let year = now.getFullYear();
      let newMonth = 0;
      if (month - period <= 0) {
        newMonth = 12 + (month - period);
        year -= 1;
      } else {
        newMonth = month - period;
      }
      now.setFullYear(year);
      now.setMonth(newMonth);
    //   console.log(String(moment(now).format("MM/DD/YYYY")));
      dispatch(
        setQuery({
          flagSlice,
          query: {
            key: "crt_after",
            val: String(moment(now).format("MM/DD/YYYY")),
          },
        })
      );
    } else if (period === 0) {
      dispatch(
        setQuery({
          flagSlice,
          query: {
            key: "crt_after",
            val: "",
          },
        })
      );
    }
  };
  useEffect(() => {
    if (exactDate && moment(exactDate)._isValid) {
      // console.log(moment(exactDate)._isValid)
      dispatch(
        setQuery({
          flagSlice,
          query: {
            key: "crt_after",
            val: String(moment(exactDate).format("MM/DD/YYYY")),
          },
        })
      );
      dispatch(
        setQuery({
          flagSlice,
          query: {
            key: "crt_before",
            val: String(moment(exactDate).format("MM/DD/YYYY")),
          },
          isReload: false,
        })
      );
    }
    if (
      startDate &&
      endDate &&
      moment(startDate)._isValid &&
      moment(endDate)._isValid
    ) {
      dispatch(
        setQuery({
          flagSlice,
          query: {
            key: "crt_after",
            val: String(moment(startDate).format("MM/DD/YYYY")),
          },
        })
      );
      dispatch(
        setQuery({
          flagSlice,
          query: {
            key: "crt_before",
            val: String(moment(endDate).format("MM/DD/YYYY")),
          },
          isReload: false,
        })
      );
    }
  }, [dispatch, endDate, exactDate, flagSlice, startDate]);

  //   const resetDate = () => {
  //     setSelDate(null);
  //     setExactDate(null);
  //     setStartDate(null);
  //     setEndDate(null);
  //   };

  return (
    <Popover {...popProps}>
      <List className={classes.root}>
        <ListItemButton onClick={handleSelPeriod(0)} selected={selDate === 0}>
          <ListItemText>全部订单</ListItemText>
        </ListItemButton>
        <Divider variant='middle' />
        <ListItemButton onClick={handleSelPeriod(1)} selected={selDate === 1}>
          <ListItemText>近一个月</ListItemText>
        </ListItemButton>
        <Divider variant='middle' />
        <ListItemButton onClick={handleSelPeriod(3)} selected={selDate === 3}>
          <ListItemText>近三个月</ListItemText>
        </ListItemButton>
        <Divider variant='middle' />
        <ListItemButton onClick={handleSelPeriod(12)} selected={selDate === 12}>
          <ListItemText>近一年</ListItemText>
        </ListItemButton>
        <Divider variant='middle' />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ListItem>
            <ListItemText>
              <DesktopDatePicker
                value={exactDate}
                onChange={(newValue) => {
                  setSelDate(null);
                  setStartDate(null);
                  setEndDate(null);
                  setExactDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    variant='standard'
                    {...params}
                    className={classes.exactDate}
                  />
                )}
              />
            </ListItemText>
          </ListItem>
          {/* <Divider variant='middle' /> */}
          <ListItem>
            <span style={{ marginRight: "10px" }}>从</span>
            <DesktopDatePicker
              value={startDate}
              onChange={(newValue) => {
                setSelDate(null);
                setExactDate(null);
                setStartDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  className={classes.intervalDate}
                  {...params}
                  size='small'
                />
              )}
            />
          </ListItem>
          <ListItem>
            <span style={{ marginRight: "10px" }}>至</span>
            <DesktopDatePicker
              value={endDate}
              onChange={(newValue) => {
                setSelDate(null);
                setExactDate(null);
                setEndDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  className={classes.intervalDate}
                  {...params}
                  size='small'
                />
              )}
            />
          </ListItem>
        </LocalizationProvider>
      </List>
    </Popover>
  );
}

import React, { useCallback, useEffect, Suspense } from "react";
import { BrowserRouter  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "./layout/AppLayout";
import "./App.css";
import { fetchOngoingOrderCount } from "./features/objectsSlice";

export default function App() {
  const dispatch = useDispatch();
  //   const ongoingOrderCount = useSelector((state) => {
  //     return state.objects[flagSlice].ongoingOrderCount;
  //   });
  const orderCountStatus = useSelector(
    (state) => state.objects.orderCountStatus
  );

  const getOngoingOrderCount = useCallback(() => {
    dispatch(fetchOngoingOrderCount());
  }, [dispatch]);

  useEffect(() => {
    if (orderCountStatus === "idle" && localStorage.getItem("accessToken"))
      getOngoingOrderCount();
  }, [getOngoingOrderCount, orderCountStatus]);

  useEffect(() => {
    const timer = setInterval(() => {
      getOngoingOrderCount();
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, [getOngoingOrderCount]);

  return (
    <BrowserRouter >
      <Suspense fallback={<>loading</>}>
        <AppLayout />
      </Suspense>
    </BrowserRouter >
  );
}

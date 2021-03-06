import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UiRows from "../../../components/ui/UiRows";
import { getObjects } from "../../../features/objectsSlice";
import ProdRow from "../../prod/ui/ProdRow";

const flagSlice = "shopProds";
export default function ShopProds({ shopId }) {
  const dispatch = useDispatch();
  const shopProds = useSelector((state) => state.objects[flagSlice]?.objects);
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api: "/Prods?Shops=" + shopId }));
  }, [dispatch, shopId]);
//   console.log(shopProds);
  return shopProds?.length > 0 ? (
    <UiRows UiRow={ProdRow} objects={shopProds} />
  ) : (
    <h3>此门店暂无同步产品</h3>
  );
}

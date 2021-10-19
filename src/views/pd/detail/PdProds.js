import React from "react";
import UiVariety from "../../../components/ui/UiVariety";
import ProdCard from "../../prod/ui/ProdCard";
import ProdRow from "../../prod/ui/ProdRow";
export default function PdProds({ prods }) {
  console.log(prods);
  return <UiVariety objects={prods} propsCard={ProdCard} UiRow={ProdRow} />;
}

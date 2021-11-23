import React from "react";

export default function ClientBasic({ object }) {
  return (
    <div>
      <div>{object.code}</div>
      <div>{object.nome}</div>
    </div>
  );
}

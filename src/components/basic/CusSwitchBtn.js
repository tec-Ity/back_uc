import React from "react";
export default function CusSwitchBtn({ label, handleClick, selected }) {
  return (
    <button
      className={
        selected === true
          ? "btn mx-3 btn-success"
          : "btn mx-3 btn-outline-success"
      }
      type='button'
      onClick={handleClick}>
      {label}
    </button>
  );
}

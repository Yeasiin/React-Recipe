import React from "react";

export default function Ingredient({ id, name, amount }) {
  return (
    <>
      <span>{name}</span>
      <span>{amount}</span>
    </>
  );
}

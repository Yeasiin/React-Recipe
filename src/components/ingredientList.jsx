import React from "react";
import Ingredient from "./ingredient";

export default function IngredientList({ ingredients }) {
  return (
    <div className="ingredient--grid">
      {ingredients.map((ingredient) => (
        <Ingredient key={ingredient.id} {...ingredient} />
      ))}
    </div>
  );
}

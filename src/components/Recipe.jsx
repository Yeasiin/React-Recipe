import React, { useContext } from "react";
import RecipeContext from "./RecipeContext";
import IngredientList from "./ingredientList";

export default function Recipe({ recipe }) {
  const { handleRecipeDelete, handleSelectedRecipe } =
    useContext(RecipeContext);
  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{recipe.name}</h3>
        <div>
          <button
            className="btn btn--primary mr-1"
            onClick={() => {
              handleSelectedRecipe(recipe.id);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn--danger"
            onClick={() => handleRecipeDelete(recipe.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Cook Time: </span>
        <span className="recipe__value"> {recipe.cookTime} Minute </span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Servings: </span>
        <span className="recipe__value"> {recipe.servings} Person </span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Instructions: </span>
        <div className="recipe__value recipe__value--indented recipe__instructions ">
          {recipe.instructions}
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Ingredient: </span>
        <div className="recipe__value recipe__value--indented">
          <IngredientList ingredients={recipe.ingredients} />
        </div>
      </div>
    </div>
  );
}

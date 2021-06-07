import React, { useContext } from "react";
import uuid from "react-uuid";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import RecipeContext from "./RecipeContext";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleSelectedRecipe } =
    useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;

    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = { id: uuid(), name: "", amount: "" };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          className="btn recipe-edit__remove-button"
          onClick={() => handleSelectedRecipe(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          value={recipe.name}
          name="name"
          onInput={(e) => handleChange({ name: e.target.value })}
          id="name"
        />
        <label className="recipe-edit__label" htmlFor="cookTime">
          Cook Time
        </label>
        <input
          className="recipe-edit__input"
          type="number"
          value={recipe.cookTime}
          onInput={(e) => handleChange({ cookTime: e.target.value })}
          name="cookTime"
          id="cookTime"
        />
        <label className="recipe-edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          className="recipe-edit__input"
          type="number"
          value={recipe.servings}
          onInput={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
          name="servings"
          id="servings"
          min="1"
        />
        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="recipe-edit__input"
          name="instructions"
          id="instructions"
          value={recipe.instructions}
          onInput={(e) => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      <label className="recipe-edit__label" htmlFor="ingredients">
        Ingredients
      </label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            key={ingredient.id}
            handleIngredientDelete={handleIngredientDelete}
            handleIngredientChange={handleIngredientChange}
            ingredient={ingredient}
          />
        ))}
      </div>

      <div className="recipe-edit__add-ingredient-button-container">
        <button className="btn btn--primary" onClick={handleIngredientAdd}>
          Add Ingredient
        </button>
      </div>
    </div>
  );
}

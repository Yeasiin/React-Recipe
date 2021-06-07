import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import RecipeContext from "./RecipeContext";
import RecipeEdit from "./RecipeEdit";
import RecipeList from "./RecipeList";
import "../css/app.css";

const LOCAL_STORAGE_KEY = "cookingWithReact";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipe);

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  const RecipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleSelectedRecipe,
    handleRecipeChange,
  };

  useEffect(() => {
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipesJSON !== null) {
      setRecipes(JSON.parse(recipesJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuid(),
      name: "recipe",
      servings: 1,
      cookTime: "1.00",
      instructions: "",
      ingredients: [{ id: uuid(), name: "", amount: "" }],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleSelectedRecipe(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipe = [...recipes];
    const index = newRecipe.findIndex((r) => r.id === id);
    newRecipe[index] = recipe;
    setRecipes(newRecipe);
  }

  return (
    <RecipeContext.Provider value={RecipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipe = [
  {
    id: 1,
    name: "Plain Rice",
    servings: 3,
    cookTime: "1.45",
    instructions:
      "1. Put Salt on Chicken \n2. Put Chicken on Oven \n3. Eat Chicken",
    ingredients: [
      { id: 1, name: "Chicken", amount: "2 Pounds" },
      { id: 2, name: "Salt", amount: "1 Tbs" },
    ],
  },
  {
    id: 2,
    name: "Plain Beef",
    servings: 4,
    cookTime: "2.45",
    instructions: "1. Put Salt on Beef \n2. Put Beef on Oven \n3. Eat Beef",
    ingredients: [
      { id: 1, name: "Beef", amount: "3 Pounds" },
      { id: 2, name: "Paprika", amount: "2 Tbs" },
    ],
  },
];
export default App;

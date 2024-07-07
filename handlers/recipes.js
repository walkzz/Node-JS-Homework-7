const { read, write } = require("../read-write");

// get all recipes
const getRecipes = async (req, res) => {
  const data = await read();
  res.status(200).json(data.recipes);
};

// create a new recipe
const createRecipe = async (req, res) => {
  const data = await read();
  data.recipes.push(req.body);
  await write(data);
  res.status(201).send("Recipe created!");
};

// update a recipe
const updateRecipe = async (req, res) => {
  const recipeIndex = req.params.index;
  const recipeData = req.body;

  let data = await read();
  data.recipes = data.recipes.map((recipe, index) => {
    if (index === Number(recipeIndex)) {
      return {
        ...recipe,
        ...recipeData,
      };
    } else {
      return recipe;
    }
  });

  await write(data);
  res.status(200).send("Recipe updated!");
};

// delete a recipe
const deleteRecipe = async (req, res) => {
  const recipeIndex = req.params.index;

  let data = await read();
  data.recipes = data.recipes.filter((recipe, index) => index !== Number(recipeIndex));

  await write(data);
  res.status(200).send("Recipe deleted!");
};

module.exports = {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
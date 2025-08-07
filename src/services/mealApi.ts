/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// src/types/Meal.ts
export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  strYoutube: string;
  [key: string]: any;
}

export const fetchMeals = async () => {
  const res = await axios.get(BASE_URL);
  return res.data.meals.slice(0, 8);
};

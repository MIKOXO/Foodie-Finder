import * as React from "react";
import '../index.css';
import { Link } from "react-router-dom";
import { LuUtensilsCrossed, LuHeart, LuTrash2 } from "react-icons/lu";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = React.useState<string[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [meals, setMeals] = React.useState<Meal[]>([]);

  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  React.useEffect(() => {
    const fetchFavoriteMeals = async () => {
      const mealPromises = favorites.map(id =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then(res => res.json())
          .then(data => data.meals ? data.meals[0] : null)
      );
      const results = await Promise.all(mealPromises);
      setMeals(results.filter(Boolean));
    };
    if (favorites.length > 0) {
      fetchFavoriteMeals();
    } else {
      setMeals([]);
    }
  }, [favorites]);

  return (
    <div className="w-[80%] mx-auto mt-3 mb-2">
      <h2 className="text-xl font-bold mt-10">Your Favourite meals</h2>
      <div className="flex items-center justify-between mb-10 w-3/12 mt-4">
        <p className="text-gray-500">{meals.length} favourite</p>
        <button
          onClick={() => setFavorites([])}
          className="flex items-center gap-2 px-4 py-1 border border-red-500 rounded-md bg-transparent text-red-500 font-semibold hover:bg-red-50 transition"
          title="Clear All Favorites"
        >
          <LuTrash2 className="text-lg" />
          Clear All
        </button>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.length === 0 && (
            <p className="text-center col-span-full text-gray-400">No favorites yet.</p>
          )}
          {meals.map(meal => (
            <div key={meal.idMeal} className="bg-white rounded-sm shadow-md cursor-pointer hover:shadow-lg transition">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full lg:h-72 h-48 md:h-56 object-cover rounded-md" />
              <h3 className="font-semibold text-sm mt-4 p-4">{meal.strMeal}</h3>
              <div className="px-3 pt-4 pb-6 flex items-center gap-6">
                <Link
                  to={`/meal/${meal.idMeal}`}
                  className="inline-flex items-center px-8 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition"
                >
                  <LuUtensilsCrossed className="mr-3" />
                  View Recipe
                </Link>
                <button
                  onClick={() => {
                    const updatedFavorites = favorites.filter(id => id !== meal.idMeal);
                    setFavorites(updatedFavorites); // Update state instead of localStorage directly
                  }}
                  className="ml-3 text-red-500 text-md cursor-pointer"
                  title="Remove from Favorites"
                >
                  <LuHeart fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;

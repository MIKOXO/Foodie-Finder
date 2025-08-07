import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuUtensilsCrossed, LuHeart, LuTrash2 } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/custom/LoadingSpinner";

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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  React.useEffect(() => {
    const fetchFavoriteMeals = async () => {
      try {
        setLoading(true);
        const mealPromises = favorites.map((id) =>
          axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => (res.data.meals ? res.data.meals[0] : null))
        );
        const results = await Promise.all(mealPromises);
        setMeals(results.filter(Boolean));
      } catch (error) {
        console.error("Error fetching favorite meals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteMeals();
    } else {
      setMeals([]);
    }
  }, [favorites]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mt-10">Your Favourite meals</h2>
      <div className="flex items-center justify-between gap-10 lg:gap-0 mb-10 w-3/12 mt-4">
        <p className="text-gray-500">{meals.length} favourite</p>
        <button
          onClick={() => setFavorites([])}
          className="flex items-center gap-2 px-4 py-1 border border-red-500 rounded-md bg-transparent text-red-500 font-semibold hover:bg-red-50 transition cursor-pointer"
          title="Clear All Favorites"
        >
          <LuTrash2 className="text-lg" />
          Clear All
        </button>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {meals.length === 0 && (
              <p className="text-center col-span-full text-gray-400">
                No favorites yet.
              </p>
            )}

            {meals.map((meal) => (
              <Card>
                <div key={meal.idMeal} className="bg-white rounded-xl">
                  <CardContent className="px-0">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full lg:h-72 h-48 md:h-56 object-cover rounded-t-xl"
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-xl py-4">
                      {meal.strMeal}
                    </CardTitle>
                  </CardHeader>
                  <button
                    onClick={() => {
                      const updatedFavorites = favorites.filter(
                        (id) => id !== meal.idMeal
                      );
                      setFavorites(updatedFavorites); // Update state instead of localStorage directly
                    }}
                    className="px-6 pb-3 text-red-500 text-md cursor-pointer"
                    title="Remove from Favorites"
                  >
                    <LuHeart fill="currentColor" />
                  </button>

                  <div className="px-6 pb-4">
                    <Button className="w-full cursor-pointer">
                      <Link
                        to={`/meal/${meal.idMeal}`}
                        className="inline-flex items-center"
                      >
                        <LuUtensilsCrossed className="mr-3" />
                        View Recipe
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

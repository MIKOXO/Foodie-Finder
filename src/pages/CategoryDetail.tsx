import * as React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { LuUtensilsCrossed, LuHeart } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/custom/LoadingSpinner";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setMeals(response.data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchMeals();
  }, [category]);

  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (mealId: string) => {
    setFavorites((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  return (
    <div>
      <div className="container mx-auto mt-3 p-6">
        <h2 className="font-semibold text-3xl">{category} Recipes</h2>
        <p className="lg:w-1/3 md:w-1/2 text-gray-500 mt-1.5">
          Discover {meals.length} delicious {category} from around the world.
        </p>

        {loading ? (
          <div className="text-center text-xl text-gray-600 py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
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
                    <CardTitle className="text-xl pt-4">
                      {meal.strMeal}
                    </CardTitle>
                  </CardHeader>

                  <button
                    onClick={() => {
                      handleFavorite(meal.idMeal);
                    }}
                    className={`px-6 pb-3 text-md text-right cursor-pointer ${
                      favorites.includes(meal.idMeal)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    title="Add to Favorites"
                  >
                    {favorites.includes(meal.idMeal) ? (
                      <LuHeart fill="red" />
                    ) : (
                      <LuHeart fill="none" />
                    )}
                  </button>

                  <div className="pb-4 px-6">
                    <Button className="w-full">
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

export default CategoryDetail;

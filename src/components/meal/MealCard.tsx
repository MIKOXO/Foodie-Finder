import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import { Meal } from "@/services/mealApi";

interface MealCardProps {
  meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
  const [favorites, setFavorites] = React.useState<string[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const handleFavorite = (mealId: string) => {
    setFavorites((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };
  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Card>
      <div className="">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full object-cover rounded-t-xl"
        />
      </div>

      <CardContent>
        <h3 className="font-semibold text-lg">{meal.strMeal}</h3>

        <div className="flex flex-row justify-between items-center">
          {meal.strCategory && (
            <Badge variant="secondary" className="text-xs">
              {meal.strCategory}
            </Badge>
          )}

          <button
            onClick={() => {
              handleFavorite(meal.idMeal);
            }}
            className={` pb-3 text-md text-right cursor-pointer ${
              favorites.includes(meal.idMeal) ? "text-red-500" : "text-gray-400"
            }`}
            title="Add to Favorites"
          >
            {favorites.includes(meal.idMeal) ? (
              <LuHeart fill="red" />
            ) : (
              <LuHeart fill="none" />
            )}
          </button>
        </div>

        <div className="my-3">
          <Link to={`/meal/${meal.idMeal}`}>
            <Button className="w-full cursor-pointer">View Recipe</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;

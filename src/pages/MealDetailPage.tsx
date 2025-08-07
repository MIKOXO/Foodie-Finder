/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Meal } from "@/services/mealApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LuArrowLeft, LuUsers, LuClock } from "react-icons/lu";

const MealDetailPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setMeal(res.data.meals[0]);
    };
    fetchMeal();
  }, [id]);

  if (!meal) return <p className="text-center mt-10">Loading...</p>;

  const ingredients = Object.entries(meal)
    .filter(([key, value]) => key.startsWith("strIngredient") && value)
    .map(([key, value], i) => ({
      ingredient: value,
      measure: meal[`strMeasure${i + 1}`],
    }));

  return (
    <section className="mx-auto container p-6">
      <div>
        <Link to="/categories" className="opacity-60">
          <LuArrowLeft className="inline-block mr-1 mb-1" /> Back to categories
        </Link>
      </div>

      {/* Meal Details */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="">
          <CardContent className="px-0">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-[360px] object-cover rounded-t-xl"
            />
          </CardContent>
          <CardHeader className="pb-4 flex flex-col space-y-2">
            <CardTitle className="text-xl">{meal.strMeal}</CardTitle>
            <Badge variant="outline">{meal.strCategory}</Badge>
          </CardHeader>
        </Card>

        {/* Ingredients */}
        <Card className="p-4">
          <CardHeader className="flex flex-row items-center gap-4 text-2xl mt-5">
            <LuUsers className="text-primary" />
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ingredients.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 ">
                  <span className="font-medium text-sm">{item.ingredient}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.measure}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-0">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${
                  meal.strYoutube.split("v=")[1]
                }`}
                title={meal.strMeal}
                allowFullScreen
                className="w-full h-full rounded-t-xl"
              />
            </div>
            <CardHeader className="py-7">
              <CardTitle>Watch on YouTube</CardTitle>
            </CardHeader>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center gap-4 text-2xl mt-5">
            <LuClock className="text-primary" />
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 px-2 leading-2 whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MealDetailPage;

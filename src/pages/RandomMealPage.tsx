import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Meal } from "@/types/Meal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RandomMealPage = () => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setMeal(res.data.meals[0]);
    } catch (err) {
      console.error("Failed to fetch random meal", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  if (!meal) {
    return <p className="text-center mt-10">Fetching a surprise meal...</p>;
  }

  return (
    <section className="mx-auto container p-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Your Surprise Meal!</h1>
        <p className="mt-1 opacity-60">
          Discover something new and delicious today
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="px-0">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-[370px] object-cover rounded-t-xl"
            />
          </CardContent>
          <CardHeader className="pb-6 flex flex-col space-y-3">
            <CardTitle>{meal.strMeal}</CardTitle>
            <Badge variant="outline">{meal.strCategory}</Badge>
          </CardHeader>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-2xl">Quick Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-5">
              {meal.strInstructions}
            </p>
            <Button
              className="cursor-pointer"
              onClick={() => navigate(`/meal/${meal.idMeal}`)}
            >
              View Full Recipe
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <Button
          className="cursor-pointer py-5 px-8"
          onClick={fetchRandomMeal}
          disabled={loading}
        >
          {loading ? "Loading..." : " Surprise Me Again"}
        </Button>
      </div>
    </section>
  );
};

export default RandomMealPage;

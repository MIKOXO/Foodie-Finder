import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FeaturesCard from "@/components/custom/FeaturesCard";
import MealCard from "@/components/meal/MealCard";
import { Button } from "@/components/ui/button";
import { LuChefHat, LuGlobe, LuUtensils, LuShuffle } from "react-icons/lu";
import { Meal, fetchMeals } from "@/services/mealApi";
import LoadingSpinner from "@/components/custom/LoadingSpinner";

const HomePage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchMeals();
      setMeals(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section id="Hero" className="">
        <div className="mx-auto container p-6 flex flex-col items-center text-center text-white">
          <h1 className="text-[35px] lg:text-[72px] lg:mt-10 font-bold lg:w-[60%]">
            Discover Meals{" "}
            <span className="bg-[linear-gradient(135deg,_var(--primary-glow),_var(--primary-hero))] bg-clip-text text-transparent">
              Around the World
            </span>
          </h1>
          <p className="font-m lg:text-[24px] lg:w-[60%]">
            Explore recipes, cooking instructions, and culinary traditions from
            every corner of the globe
          </p>

          <div>
            <div className="mt-3">
              <Link to="/random">
                <Button
                  variant="outline"
                  className="bg-transparent lg:h-12 px-20 cursor-pointer"
                >
                  <LuShuffle />
                  Surprise Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto container p-6 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <FeaturesCard
              icon={LuChefHat}
              title="Expert Recipes"
              description="Detailed cooking instructions and ingredient lists for authentic dishes"
            />
          </div>
          <div>
            <FeaturesCard
              icon={LuGlobe}
              title="Global Cuisine"
              description="Discover traditional recipes from countries around the world"
            />
          </div>
          <div>
            <FeaturesCard
              icon={LuUtensils}
              title="Easy Search"
              description="Find meals by name, ingredient, or cuisine type in seconds"
            />
          </div>
        </div>
      </section>

      {/* Featured Meal Section */}
      <section className="mx-auto container p-6 mt-16">
        <div>
          <h1 className="text-[28px] font-semibold mb-7">Featured Recipes</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;

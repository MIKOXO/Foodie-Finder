import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Meal } from "@/services/mealApi";
import MealCard from "@/components/meal/MealCard";
import SearchBar from "@/components/search/SearchBar";
import { LuUtensils } from "react-icons/lu";
import LoadingSpinner from "@/components/custom/LoadingSpinner";

const SearchPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string, filter: string) => {
    setError("");

    if (!query.trim()) {
      setError("Please enter a search term.");
      setMeals([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    let searchQuery = query.trim();

    if (filter !== "name") {
      searchQuery =
        searchQuery.charAt(0).toUpperCase() +
        searchQuery.slice(1).toLowerCase();
    }

    let url = "";

    switch (filter) {
      case "name":
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
        break;
      case "category":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchQuery}`;
        break;
      case "ingredient":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
        break;
      default:
        setError("Invalid filter selected.");
        setLoading(false);
        return;
    }

    try {
      const res = await axios.get(url);
      const results = res.data.meals;

      if (!results) {
        setMeals([]);
        setError(`No results found for "${searchQuery}".`);
      } else {
        setMeals(results);
      }
    } catch (err) {
      console.error("Search error:", err);
      setMeals([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <section className="mx-auto container p-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Search Meals</h1>
        <p className="mt-1 opacity-60">
          Find your perfect recipe by name, ingredient, or category
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div>
          <SearchBar onSearch={handleSearch} />
          {error && (
            <div className="mt-4 bg-red-200 border border-red-500 p-4 rounded-xl text-red-500 text-center font-medium">
              {error}
            </div>
          )}
        </div>
        <div className="mt-16">
          {loading ? (
            <LoadingSpinner />
          ) : searched ? (
            meals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {meals.map((meal) => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </div>
            ) : (
              <p className="text-center text-red-500 font-medium">
                No meals found for your search.
              </p>
            )
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <LuUtensils className="text-4xl text-primary" />
              <p className="text-center text-muted-foreground">
                Start your culinary journey
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;

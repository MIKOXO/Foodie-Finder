import * as React from "react";
import { useParams, Link } from "react-router-dom";
import '../index.css';
import { LuUtensilsCrossed, LuHeart } from "react-icons/lu";


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

  React.useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals))
      .catch(err => console.error(err));
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

  return <div>
    <div className="w-[80%] mx-auto mt-3 mb-2">
      <h2 className="font-bold text-3xl">{category} Recipes</h2>
      <p className="lg:w-1/3 md:w-1/2 text-gray-500 text-sm mt-1.5">Discover {meals.length} delicious {category} from around the world.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {meals.map((meal) => (
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
                  handleFavorite(meal.idMeal);
                }}
                className={`ml-3 text-md text-right cursor-pointer ${favorites.includes(meal.idMeal) ? "text-red-500" : "text-gray-400"}`}
                title="Add to Favorites"
              >
                {favorites.includes(meal.idMeal) ? <LuHeart fill="red"  /> : <LuHeart fill="none"/>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>;
};

export default CategoryDetail;

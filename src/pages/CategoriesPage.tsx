import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/custom/LoadingSpinner";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const CategoriesPage = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategory(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="container mx-auto p-6 mt-3">
      <div className="">
        <h2 className="font-semibold text-3xl">Recipe Categories</h2>
        <p className="lg:w-1/3 md:w-1/2 text-gray-500 mt-1.5">
          Browse recipes by categories and discover new flavour and cooking
          styles.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {category.map((category: Category) => (
            <Card>
              <Link
                to={`/category/${category.strCategory}`}
                key={category.idCategory}
              >
                <div className="bg-white rounded-xl cursor-pointer hover:shadow-lg transition">
                  <CardContent className="px-0">
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="w-full lg:h-72 h-48 md:h-56 object-cover rounded-t-xl"
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="font-semibold text-xl mt-4 py-4">
                      {category.strCategory}
                    </CardTitle>
                  </CardHeader>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;

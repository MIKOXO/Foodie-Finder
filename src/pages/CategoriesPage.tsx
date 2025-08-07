import * as React from "react";
import '../index.css'
import { Link } from "react-router-dom";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const CategoriesPage = () => {
  const [category,setCategory] = React.useState<Category[]>([])

  React.useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => setCategory(data.categories))
  },[])

  return <div className="w-[80%] mx-auto mt-3">
    <div className="">
      <h2 className="font-bold text-3xl">Recipe Categories</h2>
      <p className="lg:w-1/3 md:w-1/2 text-gray-500 text-sm mt-1.5">Browse recipes by categories and discover new flavour and cooking styles.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 border-rounded-xl p-4">
      {category.map((category: Category) => (
        <Link to={`/category/${category.strCategory}`} key={category.idCategory}>
          <div className="bg-white rounded-sm shadow-md cursor-pointer hover:shadow-lg transition">
            <img src={category.strCategoryThumb} alt={category.strCategory} className="w-full lg:h-72 h-48 md:h-56 object-cover rounded-md" />
            <h3 className="font-semibold text-sm mt-4 p-4">{category.strCategory}</h3>
          </div>
        </Link>
      ))}
    </div>
  </div>
};

export default CategoriesPage;

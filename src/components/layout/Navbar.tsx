import * as React from "react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { NavLink, Link, useLocation } from "react-router-dom";
import { LuHouse, LuLayoutGrid, LuHeart, LuSearch } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const LinkClass = (to: string, isActive: boolean) => {
    const currentPath = location.pathname;

    const isCategoriesActive =
      to === "/categories" &&
      (currentPath.startsWith("/categories") ||
        currentPath.startsWith("/meal/") ||
        currentPath.startsWith("/category/"));

    if (isActive || isCategoriesActive) {
      return "px-6 py-2 rounded-[8px] bg-primary text-white";
    }
    return "px-6 py-2 rounded-[8px] ease-in-out duration-300";
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="mx-auto container p-6">
      <div className="flex flex-row justify-between items-center">
        {/* Logo */}
        <div>
          <span className="text-[24px] lg:text-[36px] font-semibold bg-[linear-gradient(135deg,_var(--primary),_var(--primary-glow))] bg-clip-text text-transparent">
            Foodie Finder
          </span>
        </div>

        {/* Links */}
        <div className="hidden font-medium lg:flex items-center justify-between gap-5">
          <NavLink
            to="/"
            className={({ isActive }) => LinkClass("/", isActive)}
          >
            <LuHouse className="inline-block mb-1 mr-1" /> Home
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) => LinkClass("/categories", isActive)}
          >
            <LuLayoutGrid className="inline-block mb-1 mr-2" />
            Categories
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => LinkClass("/favorites", isActive)}
          >
            <LuHeart className="inline-block mb-1 mr-2" />
            Favorites
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) => LinkClass("/search", isActive)}
          >
            <LuSearch className="inline-block mb-1 mr-2" />
            Search
          </NavLink>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="relative w-8 h-[21px] flex flex-col justify-between items-center group"
          >
            <div
              className={clsx(
                "w-8 h-[2px] bg-black transform transition duration-300 ease-in-out",
                isOpen ? "rotate-45 translate-y-[10px]" : ""
              )}
            />
            <div
              className={clsx(
                "w-8 h-[2px] bg-black transition duration-300 ease-in-out",
                isOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <div
              className={clsx(
                "w-8 h-[2px] bg-black transform transition duration-300 ease-in-out",
                isOpen ? "-rotate-45 -translate-y-[10px]" : ""
              )}
            />
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "lg:hidden fixed top-14 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 transition-transform duration-500 ease-in-out z-40",
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        )}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/categories" onClick={() => setIsOpen(false)}>
          Categories
        </Link>
        <Link to="/favorites" onClick={() => setIsOpen(false)}>
          Favorites
        </Link>
        <Link to="/search" onClick={() => setIsOpen(false)}>
          Search
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

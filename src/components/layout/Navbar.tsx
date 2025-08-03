import * as React from "react";
import { NavLink } from "react-router-dom";
import { LuHouse, LuLayoutGrid, LuHeart, LuSearch } from "react-icons/lu";

const Navbar = () => {
  //   const [toggle, setToggle] = useState(false);
  const LinkClass = ({ isActive }) =>
    isActive
      ? "px-6 py-2 rounded-[8px] bg-primary text-white"
      : "px-6 py-2 rounded-[8px] ease-in-out duration-300";

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
          <NavLink to="/" className={LinkClass}>
            <LuHouse className="inline-block mb-1 mr-1" /> Home
          </NavLink>

          <NavLink to="/categories" className={LinkClass}>
            <LuLayoutGrid className="inline-block mb-1 mr-2" />
            Categories
          </NavLink>

          <NavLink to="/favorites" className={LinkClass}>
            <LuHeart className="inline-block mb-1 mr-2" />
            Favorites
          </NavLink>

          <NavLink to="/search" className={LinkClass}>
            <LuSearch className="inline-block mb-1 mr-2" />
            Search
          </NavLink>
        </div>

        {/* Mobile Nav */}
      </div>
    </header>
  );
};

export default Navbar;

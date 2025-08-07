import * as React from "react";
import { Link } from "react-router-dom";
import { LuInstagram, LuFacebook, LuYoutube } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="mx-auto container p-6 mt-16">
      <div className="w-full h-[0.1px] bg-black opacity-10 my-5" />
      <div className="grid grid-cols-1 lg:grid-cols-3 space-y-5 sm:space-y-0 gap-4">
        {/* Logo */}
        <div className="text-center sm:text-left">
          <span className="text-[24px] lg:text-[36px] font-semibold bg-[linear-gradient(135deg,_var(--primary),_var(--primary-glow))] bg-clip-text text-transparent">
            Foodie Finder
          </span>
          <p className="mt-3 opacity-60 lg:w-[80%]">
            Discover, cook, and share delicious recipes from around the world.
          </p>
        </div>

        {/* Links */}
        <div className="font-medium flex flex-col lg:flex-row justify-between items-center gap-3 mx-5">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        {/* Socials */}
        <div className="text-2xl text-primary cursor-pointer flex flex-row justify-between items-center lg:ml-36">
          <LuInstagram />
          <LuFacebook />
          <LuYoutube />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

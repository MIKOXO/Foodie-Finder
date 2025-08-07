import * as React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">This page does not exist</p>
      <Button>
        <Link to="/" className="text-white rounded-md px-3 py-2">
          Go Back
        </Link>
      </Button>
    </section>
  );
};

export default NotFoundPage;

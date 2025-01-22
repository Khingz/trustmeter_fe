import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-indigo-600 font-bold text-3xl text-center mb-10">TrustMeter</h2>
        <h2 className="text-7xl text-center text-gray-800">404</h2>
        <h3 className="text-center text-lg text-gray-600">Page Not Found</h3>
        <div className="mt-6 flex justify-center">
          <Link to="/" className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;


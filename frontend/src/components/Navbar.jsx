import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/message";
import { ToastContainer } from "react-toastify";

export const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleButton = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInUserEmail");
      handleSuccess("Logout successful");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      handleSuccess("Already logged out");
    }
  };

  return (
    <>
      <nav className="bg-gray-200 shadow-inner shadow-red-900 border-b-2 border-red-200">
        <div className="max-w-full mx-auto px-4 md:px-4 lg:px-12 py-2 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo section */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-3xl md:text-2xl lg:text-3xl font-bold font-serif hover:text-red-400"
              >
                goldBasket
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-14">
              <Link to="/" className="text-xl text-gray-800 hover:text-black font-serif">
                Home
              </Link>
              <Link to="/about" className="text-xl text-gray-800 hover:text-black font-serif">
                About
              </Link>
              {token ? (
                <Link
                  to="/logout"
                  className="text-xl text-gray-800 hover:text-black font-serif"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="text-xl text-gray-800 hover:text-black font-serif">
                    Signup
                  </Link>
                  <Link to="/login" className="text-xl text-gray-800 hover:text-black font-serif">
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile button for navbar */}
            <div className="md:hidden flex items-center">
              <button
                onClick={handleToggleButton}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu responsiveness */}
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} py-2 text-center`}>
          <Link
            to="/"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-blue-600"
          >
            About
          </Link>
          {token ? (
            <Link
              to="/logout"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-blue-600"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-blue-600"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-300 hover:text-blue-600"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

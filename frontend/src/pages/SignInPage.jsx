import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../utils/message";
export const SignInPage = () => {

  const navigate = useNavigate();

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(token) {
      navigate("/")
    }
  },)

  const [signInState, setSignInState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const handleChange = (e) => {
    console.log(e)
    const name = e.target.name;
    const value = e.target.value;

    setSignInState({
      ...signInState,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = signInState;
    if (!name || !email || !password || !confirmpassword) {
      return handleError("all fields are required!")
    }
    try {
      const url = "http://localhost:8000/api/user/register"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInState)
      });

      const result = await response.json();
      console.log(result)
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
      else if (error) {
        handleError(error)
      }
      else if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error)
    }
  }
  return (
    <>
      <div className="bg-gradient-to-br from-black to-blue-950 min-h-screen flex justify-center items-center">
        <div className="max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white md:grid md:grid-cols-2">
          {/* Left Section */}
          <div className=" flex items-center justify-center bg-black">
            <img
              src="pexels-sebastiaan9977-1097456.jpg"
              alt="Secure login"
              className="rounded-lg shadow-md transform transition duration-500 hover:-translate-y-4"
            />
          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
              Signin to Continue
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-lg font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  value={signInState.name}
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"

                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  value={signInState.email}
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"

                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-lg font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  value={signInState.password}
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"

                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-lg font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  value={signInState.confirmpassword}
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"

                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-300 hover:scale-105"
              >
                Sign In
              </button>
            </form>

            {/* Animation on hover */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?<Link to="/login" className="text-blue-900 font-semibold ml-2 hover:text-red-600">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

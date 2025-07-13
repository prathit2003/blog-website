import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignIn: React.FC = () => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlesignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          email: Email,
          password: password,
        }
      );
      const { token, message, refreshtoken } = response.data;
      localStorage.setItem("authtoken", token);
      localStorage.setItem("refreshtoken", refreshtoken);
      alert(message);
      navigate(-1);
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message || "Error signing in.");
      } else {
        alert("Unexpected error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4 py-12">
      <div className="absolute inset-0 z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-400 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              id="blogverse-pattern"
              x="50%"
              y={-1}
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#blogverse-pattern)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex z-20 mx-12 sm:mx-16 md:mx-32 lg:mx-auto flex-col lg:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden max-h-[90vh] lg:max-h-[70vh]"
      >
        {/* Image Section */}
        <div className="lg:w-1/2 hidden lg:block">
          <img
            src="images/login.jpg"
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 px-12 py-8 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center flex items-center space-x-2 justify-center mr-4">
              <img
                className=" h-12 w-auto"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Blogverse"
              />
              <h1 className="text-3xl font-bold text-gray-900">Blogverse</h1>
            </div>
            <h2 className="mt-6 text-2xl text-center font-bold text-gray-700">
              Sign in to your account
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    id="password"
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlesignin}
                type="button"
                className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign in
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Are you a new member?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;

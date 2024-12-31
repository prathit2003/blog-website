import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isLoggedIn from "../functions/loggedin";
import scheduleTokenRefresh from "../functions/schedulerefresh";

const Header = () => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(isLoggedIn());

  const handleSignupButton = () => navigate("/signup");
  const handleLoginButton = () => navigate("/signin");

  const handleLogoutButton = () => {
    setLogged(false);
    localStorage.removeItem("authtoken");
    localStorage.removeItem("refreshtoken");
    navigate("/home");
  };

  useEffect(() => {
    if (logged) {
      const token = localStorage.getItem("authtoken") || "";
      const refreshtoken = localStorage.getItem("refreshtoken") || "";
      scheduleTokenRefresh(token, refreshtoken);
    }
  }, [logged]);

  return (
    <header className="sticky top-0 w-full bg-[#22223B] text-[#F2E9E4] py-2 shadow-md border-b-2 border-white z-10">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold font-['Merriweather', 'serif']">MyBlog</div>

        <nav className="space-x-6 hidden md:flex">
          {["Home", "Trending", "Post", "Blogs"].map((text, idx) => (
            <Link
              key={idx}
              to={`/${text.toLowerCase()}`}
              className="relative text-[#F2E9E4] font-['Open Sans', 'sans-serif'] text-lg hover:text-[#CBB9A8] group transition-all duration-300 ease-in-out transform hover:scale-95"
            >
              {text}
              <span className="absolute bottom-[-2px] left-1/2 w-0 h-[2px] bg-[#F2E9E4] transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {logged ? (
          <div className="space-x-6">
            <button
              className="px-8 py-3 bg-transparent text-[#F2E9E4] border-2 border-[#F2E9E4] rounded-full hover:bg-[#F2E9E4] hover:text-[#22223B] transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleLogoutButton}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              className="px-8 py-3 bg-transparent text-[#F2E9E4] border-2 border-[#F2E9E4] rounded-full hover:bg-[#F2E9E4] hover:text-[#22223B] transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleSignupButton}
            >
              Sign Up
            </button>
            <button
              className="px-8 py-3 bg-transparent text-[#F2E9E4] border-2 border-[#F2E9E4] rounded-full hover:bg-[#F2E9E4] hover:text-[#22223B] transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleLoginButton}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
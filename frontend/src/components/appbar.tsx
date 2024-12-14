import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import isLoggedIn from "../functions/loggedin";
const Header = () => {
  const navigate = useNavigate();
  const [logged, setlogged] = useState(false);
  const handlesignupbutton = () => {
    navigate("/signup");
  };

  const handleloginbutton = () => {
    navigate("/signin");
  };
  const handlelogoutbutton = () => {
    setlogged(false);
    navigate("/home");
  }
  useEffect(() => {
    if (isLoggedIn()) {
      setlogged(true);
    }
  }, []);

  return (
    <header className="sticky top-0 w-full bg-black text-white py-2 shadow-md border-b-2 border-white z-10">
      <div className="container mx-auto px-6 flex items-center justify-between">

        <div className="text-2xl font-bold font-['Merriweather', 'serif']">MyBlog</div>


        <nav className="space-x-6 hidden md:flex">
          {["Home", "Trending", "Post", "Blogs"].map((text, idx) => (
            <Link
              key={idx}
              to={`/${text.toLowerCase()}`}
              className="relative text-white font-['Open Sans', 'sans-serif'] text-lg hover:text-gray-400 group"
            >
              {text}

              <span className="absolute bottom-[-2px] left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {logged ? <div className='space-x-6'>
          <button
            className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handlelogoutbutton}
          >
            Log out
          </button>
        </div> : <div className="space-x-4">
          <button
            className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handlesignupbutton}
          >
            Sign Up
          </button>
          <button
            className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handleloginbutton}
          >
            Log In
          </button>
        </div>}
      </div>
    </header>
  );
};

export default Header;

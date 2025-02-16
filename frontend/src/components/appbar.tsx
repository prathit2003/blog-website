import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLoginButton = () => navigate("/signin");

  return (
    <header className="sticky top-0 w-full bg-white shadow-md border-b border-gray-300 z-10 font-serif">
      <div className="container mx-auto px-6 flex items-center py-3">

        <div className="text-2xl font-bold">LOGO</div>


        <nav className="flex ml-6 space-x-6">
          {["Explore", "Trending", "About"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-black text-lg transition-all duration-300 hover:text-gray-600"
            >
              {link}
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 hover:w-full transform -translate-x-1/2"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center ml-auto space-x-6">
          <a
            href="#signup"
            className="text-black text-lg underline transition-all duration-300 hover:text-gray-600"
          >
            signup
          </a>
          <button
            onClick={handleLoginButton}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg transition-all duration-200 hover:scale-95 active:scale-90"
          >Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

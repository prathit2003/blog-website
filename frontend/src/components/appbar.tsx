import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const navigate = useNavigate();
  const handlesignin = () => {
    navigate("/signin");
  };
  const handleProfileClick = () => {
    navigate("/myprofile");
  };
  const navigation = [
    { name: "Explore", href: "/blogs" },
    { name: "Trending", href: "/trending" },
    { name: "Catagories", href: "/catagory" },
    { name: "About", href: "#about" },
  ];

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [ProfilepicUrl, setProfilepicUrl] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authtoken");

    if (token) {
      const getinfo = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/user/info",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfilepicUrl(response.data.profilePicture);
          setUserLoggedIn(true);
        } catch (error) {
          console.log(error);
        }
      };
      getinfo();
    }
  }, []);
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-6 py-4 lg:px-16"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <img
              alt="blogverse"
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold text-gray-900">
              blogverse
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-black hover:bg-gray-100 transition"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-gray-800 hover:text-black border-b-2 border-transparent hover:border-purple-600 transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Login button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userLoggedIn ? (
            <div className="w-1/12 h-1/12 rounded-full ring-2 ring-indigo-700 shadow-md hover:scale-105 hover:cursor-pointer">
              {ProfilepicUrl ? (
                <img
                  onClick={handleProfileClick}
                  src={ProfilepicUrl}
                  alt="profile-picture"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  onClick={handleProfileClick}
                  src="images/profilepic.webp"
                  alt="profile-picture-holder"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ) : (
            <a
              onClick={handlesignin}
              className="text-lg font-semibold text-gray-800 hover:text-purple-600 hover:cursor-pointer transition"
            >
              Log in <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-xl sm:ring-1 sm:ring-gray-900/10 rounded-l-xl">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <img
                alt="blogverse"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-black">blogverse</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-700 hover:text-black hover:bg-gray-100 transition"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-4 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-purple-600 transition"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {userLoggedIn ? (
                  <div className="w-1/12 h-1/12 rounded-full ring-2 ring-indigo-700 shadow-md hover:scale-105 hover:cursor-pointer">
                    {ProfilepicUrl ? (
                      <img
                        onClick={handleProfileClick}
                        src={ProfilepicUrl}
                        alt="profile-picture"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        onClick={handleProfileClick}
                        src="images/profilepic.webp"
                        alt="profile-picture-holder"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <a
                    onClick={handlesignin}
                    className="text-lg font-semibold text-gray-800 hover:text-purple-600 hover:cursor-pointer transition"
                  >
                    Log in <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import AppBar from "../components/appbar";
import Footer from "../components/footer";
import ReviewsCarousel from "../components/carousel";
import scheduleTokenRefresh from "../functions/schedulerefresh";
const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const token = localStorage.getItem("authtoken") || "";
  const refreshtoken = localStorage.getItem("refreshtoken") || "";
  scheduleTokenRefresh(token, refreshtoken);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <>
      <AppBar />
      <div className="relative w-full h-[600vh]">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="h-[100vh] w-full bg-black"></div>
          <div className="h-[180vh] w-full bg-white"></div>
          <div className="h-[120vh] w-full bg-black"></div>
        </div>


        <div className="absolute top-8 left-8 transform bg-black text-white max-w-3xl p-8 pt-16 shadow-lg rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog with the best.</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            More bloggers and independent creators choose WordPress than any other blogging tool. Tap into intuitive, flexible tools that put writers, bloggers, and creators first.
          </p>
          <div className="mt-4">
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#f3e5ab] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3e5ab] focus:ring-offset-2 transition-all duration-300 ease-in-out">
              Start a blog
            </button>
          </div>
        </div>

        <div className="absolute top-[50vh] left-1/2 transform -translate-x-1/2 h-[80vh] w-[60vw] border-8 border-transparent bg-gray-100 flex items-center justify-center shadow-lg rounded-t-lg">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Placeholder"
            className="h-full w-full object-cover rounded-t-lg"
          />
        </div>


        <div className="absolute top-[140vh] left-8 transform bg-white text-black max-w-3xl p-8 mt-4 pt-4 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, meet flexible</h1>
          <p className="text-lg md:text-xl text-black mb-8">
            Whatever you’re publishing. Whoever your audience is. WordPress.com makes it simple to get started. And easy to expand your site as your audience grows.
          </p>
          <div className="mt-4">
            <button className="bg-black text-white font-semibold px-6 py-4 rounded-lg hover:bg-[#444444] hover:text-[#f3e5ab] focus:outline-none focus:ring-2 focus:ring-[#f3e5ab] focus:ring-offset-2 transition-all duration-300 ease-in-out">
              Start a blog
            </button>
          </div>
        </div>


        <div className="absolute top-[180vh] left-8 right-8 flex items-stretch justify-between p-8 space-x-6 flex-col md:flex-row">
          <div className="flex flex-col flex-1 space-y-6 justify-center">
            {["Blog beautifully", "Edit easily", "Share anything and everything, simply"].map((title, index) => (
              <div key={index}>
                <div className="flex items-center cursor-pointer" onClick={() => handleToggle(index + 1)}>
                  <div className="w-3 h-3 rounded-full bg-black mr-4 flex-shrink-0"></div>
                  <span className="text-black font-medium text-2xl">{title}</span>
                  <BsArrowDownShort className="ml-auto text-black" />
                </div>
                {activeIndex === index + 1 && (
                  <div className="mt-2 text-black">
                    <p>

                      {index === 0
                        ? "Customize your blog’s look and feel in a couple of clicks with beautifully designed themes."
                        : index === 1
                          ? "From simple and clean to glossy magazine – whatever your publishing style, the intuitive block editor adapts to you."
                          : "From video to audio, stories to GIFs, bring it all together—right from where you write."}
                    </p>
                  </div>
                )}
                <hr className="border-t border-gray-300 my-4" />
              </div>
            ))}
          </div>

          <div className="flex-1 h-[80vh] w-[30vw] border-4 border-transparent bg-gray-100 flex justify-center items-center shadow-lg rounded-lg">
            <img
              src="https://via.placeholder.com/800x600"
              alt="Feature Image"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>

        <div className="absolute top-[290vh] left-8 transform bg-black text-white max-w-3xl p-8 pt-4 shadow-lg rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">See what your favourite celebrity has to say.</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover insights and personal stories from your favorite celebrity. Get a glimpse into their world, thoughts, and experiences shared directly with you.
          </p>
          <div className="mt-4">
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#f3e5ab] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3e5ab] focus:ring-offset-2 transition-all duration-300 ease-in-out">
              Start a blog
            </button>
          </div>
        </div>

        <div className="absolute top-[340vh] left-1/2 transform -translate-x-1/2 h-[90vh] w-[60vw] border-8 border-transparent bg-gray-100 flex items-center justify-center shadow-lg rounded-t-lg">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Placeholder"
            className="h-full w-full object-cover rounded-t-lg"
          />
        </div>
      </div>

      <div className="absolute top-[440vh] left-8 transform bg-white text-black max-w-3xl p-8 pt-28 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">What Our Users Are Saying About Us</h1>
        <p className="text-lg md:text-xl text-black mb-8">
          "Our platform has changed the way I share my thoughts with the world. It's user-friendly and allows me to reach so many people with ease!"
          <br />
          "The community here is amazing. I've made so many connections and can't imagine my life without this blogging platform."
        </p>
        <div className="mt-4">
          <button className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#f3e5ab] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#f3e5ab] focus:ring-offset-2 transition-all duration-300 ease-in-out">
            Join the Conversation
          </button>
        </div>
      </div>

      <div className="absolute top-[500vh] flex justify-center items-center w-full h-screen bg-white">
        <ReviewsCarousel />
      </div>

      <div className="bg-sky-600 py-16 px-8 flex justify-center items-center h-[70vh]">
        <div className="text-left max-w-lg text-white ml-80 pl-36">
          <h2 className="text-4xl font-semibold mb-4 ">Join the millions of creators publishing with Bloggers.</h2>
          <p className="text-lg mb-6 text-justify">
            Build your blog—and your audience—with the same tool that powers almost half the web. Built on lightning-fast, seriously secure, hassle-free hosting. That’s WordPress.com.
          </p>
          <div className="text-left">
            <button className="bg-white text-sky-600 font-semibold px-6 py-3 rounded-lg hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out">
              Start a blog
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
``

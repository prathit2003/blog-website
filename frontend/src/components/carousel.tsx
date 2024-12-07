import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Importing icons

const ReviewsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      name: "Jane Doe",
      title: "Best Blogging Platform",
      content:
        "I’ve been using this platform for a year, and it’s amazing! The design tools and ease of use make it the best choice for bloggers.",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "John Smith",
      title: "Highly Recommend",
      content:
        "From starting my first blog to growing an audience, this website has everything you need to succeed. Highly recommend it!",
      avatar: "https://via.placeholder.com/100",
    },
    {
      name: "Emily Johnson",
      title: "Love the Features",
      content:
        "The customization options are endless, and the drag-and-drop editor is super intuitive. I absolutely love the features!",
      avatar: "https://via.placeholder.com/100",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-[70vw] h-[80vh] bg-black text-white rounded-lg shadow-lg p-10 flex items-center justify-center">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-10 top-1/2 transform -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full flex items-center justify-center transition-transform hover:translate-x-[-10px] hover:shadow-lg focus:outline-none"
        aria-label="Previous Slide"
      >
        <FiChevronLeft size={30} className="text-white" />
      </button>

      {/* Current Review */}
      <div className="text-center max-w-4xl">
        <img
          src={reviews[currentSlide].avatar}
          alt={reviews[currentSlide].name}
          className="w-24 h-24 rounded-full mx-auto mb-8 shadow-md"
        />
        <h2 className="text-4xl font-semibold mb-4">{reviews[currentSlide].title}</h2>
        <p className="text-xl mb-6">{reviews[currentSlide].content}</p>
        <p className="text-lg italic">- {reviews[currentSlide].name}</p>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full flex items-center justify-center transition-transform hover:translate-x-[10px] hover:shadow-lg focus:outline-none"
        aria-label="Next Slide"
      >
        <FiChevronRight size={30} className="text-white" />
      </button>

      {/* Lines */}
      <div className="absolute bottom-8 flex justify-center space-x-4">
        {reviews.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 h-1 bg-white cursor-pointer ${currentSlide === index ? "w-10" : "w-4"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;

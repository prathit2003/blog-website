import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Tech Entrepreneur",
    quote:
      "Over the years, I’ve acquired a gratifying number of readers and followers, with more arriving each day, and I owe much of that audience to the myriad innovative features, unparalleled insights, and cutting-edge technology that blogverse.com provides. The platform continues to evolve and give every writer the opportunity to reach new horizons in the digital space.",
  },
  {
    name: "Ishita Roy",
    role: "Travel Blogger",
    quote:
      "My entire life has been dedicated to the art of travel and storytelling. Thanks to blogverse, I have discovered a broader canvas where every journey and adventure is captured in vivid detail, allowing me to share my passion with a global audience in a more comprehensive and enriched manner than ever before. The experience is truly transformative.",
  },
  {
    name: "Rehan Kapoor",
    role: "Mindfulness Coach",
    quote:
      "blogverse has changed the way I connect with thousands. The enhanced platform offers greater visibility, more detailed storytelling tools, and an engaging design that truly reflects my experience in mindfulness and wellness. I now reach out to a worldwide audience and provide professional insights with greater clarity and impact, all thanks to blogverse and it's community",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-black text-white py-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto relative px-8 py-10 transition-all duration-500">
        {/* Testimonial Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl font-light mb-6 text-white/90  leading-relaxed">
              “{testimonials[index].quote}”
            </p>
            <h4 className="text-lg sm:text-xl font-semibold">
              {testimonials[index].name}
            </h4>
            <span className="text-sm text-gray-300">
              {testimonials[index].role}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition"
            aria-label="Next"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === i ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

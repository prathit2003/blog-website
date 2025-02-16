import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">

        {/* Left Side - Community CTA */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold">Join Our Community</h2>
          <p className="mt-3 text-gray-400 max-w-md">
            Stay updated with the latest articles, discussions, and insights. Connect with like-minded individuals.
          </p>
          <div className="mt-5 flex gap-4">
            <a href="#" className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-lg text-sm transition">
              Join Forum
            </a>
            <a href="#" className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-lg text-sm transition">
              Subscribe
            </a>
          </div>
        </div>

        {/* Right Side - Social Links & Navigation */}
        <div className="md:w-1/2 flex flex-col md:items-end mt-8 md:mt-0">
          {/* Social Media Icons */}
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn size={22} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <FaYoutube size={22} />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-end gap-6 mt-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">Latest Blogs</a>
            <a href="#" className="hover:text-white transition">Categories</a>
            <a href="#" className="hover:text-white transition">Write for Us</a>
            <a href="#" className="hover:text-white transition">Contact Us</a>
          </div>

          {/* Legal Links */}
          <div className="flex justify-end gap-6 text-gray-500 text-sm mt-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Disclaimer</a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} YourBlogName. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

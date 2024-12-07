import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white text-center py-12">
      <div className="container mx-auto px-6">
        <p className="text-lg md:text-xl mb-6">© 2024 MyBlog. All Rights Reserved.</p>

        <div className="space-x-6 mb-8">
          <a href="#home" className="hover:text-gray-400 text-lg md:text-xl">Home</a>
          <a href="#about" className="hover:text-gray-400 text-lg md:text-xl">About</a>
          <a href="#contact" className="hover:text-gray-400 text-lg md:text-xl">Contact</a>
          <a href="#privacy" className="hover:text-gray-400 text-lg md:text-xl">Privacy Policy</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://facebook.com" className="text-white hover:text-blue-500">
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-400">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="https://instagram.com" className="text-white hover:text-pink-500">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-blue-700">
            <i className="fab fa-linkedin-in text-2xl"></i>
          </a>
        </div>

        {/* Newsletter Section */}
        <div className="mb-8">
          <p className="text-lg md:text-xl mb-4">Stay updated with our latest posts</p>
          <div className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg text-black"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-lg md:text-xl mb-4">
          <p>Contact us at: <a href="mailto:info@myblog.com" className="text-blue-400">info@myblog.com</a></p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;

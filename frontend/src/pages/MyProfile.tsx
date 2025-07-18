import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Blogs from "../components/blogs";
import { Blog } from "../types/blogtypes";
import {
  FaArrowLeft,
  FaCamera,
  FaEdit,
  FaFileAlt,
  FaTimes,
  FaUserSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import isLoggedIn from "../functions/loggedin";
import { Button } from "@headlessui/react";
import Loading from "../components/loading";

interface Subscriptions {
  username: string;
  profilePicture: string;
}

interface User {
  bio: string;
  username: string;
  profilePicture: string;
  email: string;
  subscriptions: Subscriptions[];
}

const MyProfile = () => {
  const [userinfo, setUserinfo] = useState<User | null>(null);
  const [selectedTab, setSelectedTab] = useState<
    "myblogs" | "liked" | "bookmarked"
  >("myblogs");
  const [blogToUpdate, setBlogToUpdate] = useState<Blog>();
  const [updatepopup, setUpdatepopup] = useState(false);
  const [blogsStore, setBlogsStore] = useState<Blog[]>([]);
  const [likedblogs, setLikedBlogs] = useState<Blog[]>([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  const handleupdate = async (blog: Blog) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/blogs/update?id=${blog.id}`,
        {
          title: blog.title,
          content: blog.content,
          published: true,
          tags: blog.tags.map((tag) => tag.name),
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      console.log(response.data);
      console.log(response.data.post);
      const updatedBlog = response.data?.post;
      setBlogsStore((prev) =>
        prev.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );

      setUpdatepopup(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserInfo = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserinfo(response.data.data);
  };

  const handleBlogs = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/blogs/my-blogs",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setBlogsStore(response.data.post);
  };

  const handleLikedBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/blogs/likedBlogs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setLikedBlogs(response.data.likedBlogs);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching liked blogs:", error);
    }
  };
  const handleBookmarkedBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/blogs/bookmarkedBlogs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setBookmarkedBlogs(response.data.bookmarkedBlogs);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching bookmarked blogs:", error);
    }
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axios.post(
        "http://localhost:3000/api/v1/upload-profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleUserInfo();
    } catch (error) {
      console.error("Error uploading profile picture", error);
    }
  };

  useEffect(() => {
    if (!token || !isLoggedIn()) {
      navigate("/signin");
      return;
    }
    handleUserInfo();
    handleBlogs();
  }, []);

  return (
    <>
      {updatepopup && blogToUpdate && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-4 w-[90%] max-w-xl relative">
            <button
              onClick={() => setUpdatepopup(false)}
              className="absolute top-3 right-3 text-gray-800 hover:text-indigo-900 transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="text-lg font-semibold text-gray-900 "
                >
                  blog Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={blogToUpdate?.title}
                  placeholder="update the title of your post"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  onChange={(e) =>
                    setBlogToUpdate((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="text-lg font-semibold text-gray-900"
                >
                  blog Content
                </label>
                <textarea
                  id="content"
                  value={blogToUpdate?.content}
                  placeholder="Write the content of your post here"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  rows={6}
                  onChange={(e) =>
                    setBlogToUpdate((prev) =>
                      prev ? { ...prev, content: e.target.value } : prev
                    )
                  }
                ></textarea>
              </div>

              <div>
                <label className="text-lg font-semibold text-gray-900">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {blogToUpdate?.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border border-white text-indigo-900 rounded text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition duration-300"
                onClick={() => handleupdate(blogToUpdate)}
              >
                update Post
              </button>
            </form>
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="p-4 bg-gradient-to-br from-indigo-200 via-white to-indigo-300 flex items-center gap-x-4 h-screen w-full"
      >
        {/* Left Section */}
        <div className="flex flex-col w-2/3 h-full gap-4">
          {/* Back Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              onClick={handleBackButton}
              className="w-fit flex items-center gap-2  ml-5 bg-white shadow-2xl rounded-xl py-2 px-4 text-gray-700 hover:text-indigo-600 transition"
            >
              <FaArrowLeft />
              <span>Back</span>
            </Button>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white shadow-2xl rounded-xl py-8 px-12"
          >
            <div className="flex items-start gap-8">
              {/* Profile Picture */}
              <div className="relative w-36 h-36 flex-shrink-0">
                <img
                  src={userinfo?.profilePicture || "images/profilepic.webp"}
                  alt="Profile"
                  className="w-36 h-36 object-cover rounded-full shadow-2xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  id="profilePictureInput"
                />
                <button
                  onClick={() =>
                    document.getElementById("profilePictureInput")?.click()
                  }
                  className="group absolute bottom-1 right-1 bg-white border-2 border-indigo-600 rounded-full p-2 shadow-md hover:bg-indigo-600 transition"
                >
                  <FaCamera className="w-5 h-5 text-indigo-600 group-hover:text-white transition" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex flex-col justify-center max-w-[600px] w-full">
                <div className="flex items-center">
                  <h1 className="text-2xl font-semibold text-gray-900 mr-2">
                    {userinfo?.username}
                  </h1>
                  <button className="hover:bg-gray-100 p-1 rounded-full transition">
                    <FaEdit className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>
                <h3 className="text-md text-gray-600">{userinfo?.email}</h3>
                <p className="text-gray-700 mt-2">
                  {userinfo?.bio ||
                    "Software engineer with a strong background in React, Node.js, and cloud technologies. Dedicated to delivering high-performance applications and continuous improvement."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Blogs Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 overflow-y-auto bg-white shadow-2xl rounded-xl w-full h-1/3"
          >
            {/* Sticky Tab Selector */}
            <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-around gap-4">
              <button
                onClick={() => setSelectedTab("myblogs")}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedTab === "myblogs"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                My Blogs
              </button>
              <button
                onClick={() => {
                  setSelectedTab("liked");
                  if (likedblogs.length === 0) handleLikedBlogs();
                }}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedTab === "liked"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Liked
              </button>
              <button
                onClick={() => {
                  setSelectedTab("bookmarked");
                  if (bookmarkedBlogs.length === 0) handleBookmarkedBlogs();
                }}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedTab === "bookmarked"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Bookmarked
              </button>
            </div>

            {/* Blog Content */}
            {loading ? (
              <Loading />
            ) : (
              <>
                {(() => {
                  const blogsToRender =
                    selectedTab === "myblogs"
                      ? blogsStore
                      : selectedTab === "liked"
                      ? likedblogs
                      : bookmarkedBlogs;

                  return blogsToRender.length > 0 ? (
                    blogsToRender.map((blog, index) => (
                      <div key={index} className="w-full">
                        <Blogs
                          blog={blog}
                          setBlogToUpdate={setBlogToUpdate}
                          state={selectedTab}
                          setUpdatePopup={setUpdatepopup}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                      <FaFileAlt className="w-12 h-12 text-indigo-400" />
                      {selectedTab === "myblogs" ? (
                        <>
                          <p className="text-center">
                            No blogs found. Start writing your first blog!
                          </p>
                          <Button
                            onClick={() => navigate("/post")}
                            className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white px-4 py-2 hover:bg-indigo-700 transition"
                          >
                            Create a Blog
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-center">
                            No blogs found, explore more.
                          </p>
                          <Button
                            onClick={() => navigate("/blogs")}
                            className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white px-4 py-2 hover:bg-indigo-700 transition"
                          >
                            Explore
                          </Button>
                        </>
                      )}
                    </div>
                  );
                })()}
              </>
            )}
          </motion.div>
        </div>

        {/* Right Section - Subscriptions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-2xl rounded-xl w-1/3 h-full flex flex-col"
        >
          <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl px-8 py-6 shadow-xl m-6">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Subscriptions
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {userinfo?.subscriptions && userinfo.subscriptions.length > 0 ? (
              <ul className="w-full space-y-2">
                {userinfo.subscriptions.map((sub, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg transition-shadow hover:shadow-md"
                  >
                    <img
                      src={sub.profilePicture}
                      alt={`${sub.username}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <span className="text-gray-700">{sub.username}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4 p-8">
                <FaUserSlash className="w-12 h-12 text-indigo-400" />
                <p className="text-center">
                  No subscriptions yet. Subscribe to your favourite bloggers to
                  stay updated.
                </p>
                <Button
                  onClick={() => navigate("/blogs")}
                  className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white px-4 py-2 hover:bg-indigo-700 transition"
                >
                  Explore
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MyProfile;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCamera, FaUser } from "react-icons/fa";
import isLoggedIn from "../functions/loggedin";

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

interface Comment {
  content: string;
  authorId: number;
}

interface Media {
  name: string;
  mimeType: string;
  data: string;
}

interface Likes {
  authorId: number;
  postId: number;
}

interface Blogs {
  id: number;
  title: string;
  author: {
    username: string;
    profilepictureurl: string;
  };
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  media: Media[];
  likes: Likes[];
  comments: Comment[];
  published: boolean;
  tags: { name: string; id: number }[];
}

const MyProfile = () => {
  const [userinfo, setUserinfo] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [selectedSubscriptions, setSelectedSubscriptions] =
    useState<Subscriptions[] | null>(null);
  const token = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  const handleViewSubscriptions = (subscriptions: Subscriptions[]) => {
    setSelectedSubscriptions(subscriptions);
  };

  const handleUserInfo = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserinfo(response.data.data);
  };

  const handleBlogs = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/blogs/my-blogs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data.post);
    setBlogs(response.data.post);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axios.post("http://localhost:3000/api/v1/upload-profile-picture", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
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
    <div className="p-4 bg-[#22223B] text-[#F2E9E4]">

      <button
        onClick={handleBackButton}
        className="flex items-center mb-4 text-blue-500 hover:underline"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div>
        <ul className="space-y-4">
          {userinfo && (
            <li className="p-4 rounded-lg shadow-md bg-white flex items-start justify-between">
              <div className="flex items-center space-x-4 relative">

                <div className="relative w-16 h-16">
                  {userinfo.profilePicture ? (
                    <img
                      src={userinfo.profilePicture}
                      alt={`${userinfo.username}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-16 h-16 text-gray-500" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"

                    onChange={handleProfilePictureChange}
                  />
                  <label

                    className="absolute bottom-0 right-0 w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-300"
                  >
                    <FaCamera size={12} />
                  </label>
                </div>

                <div>
                  <span className="font-medium text-lg">{userinfo.username}</span>
                  <p className="text-sm text-gray-600">{userinfo.bio}</p>
                </div>
              </div>
              <button
                onClick={() => handleViewSubscriptions(userinfo.subscriptions)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Subscriptions
              </button>
            </li>
          )}
        </ul>
      </div>

      {selectedSubscriptions && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Subscribed Channels</h2>
          <ul className="space-y-4">
            {selectedSubscriptions.map((channel, index) => (
              <li key={index} className="flex items-center space-x-4">
                <img
                  src={channel.profilePicture}
                  alt={`${channel.username}'s profile`}
                  className="w-12 h-12 rounded-full"
                />
                <span className="font-medium text-lg">{channel.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Blogs</h2>
        <div className="space-y-6">
          {blogs && blogs.map((blog) => (
            <div key={blog.id} className="p-4 rounded-lg shadow-md bg-white border border-gray-200">
              <div className="flex items-center space-x-4 mb-2">
                <img
                  src={blog.author.profilepictureurl}
                  alt={`${blog.author.username}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{blog.author.username}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2">{blog.title}</h4>
              <p className="text-gray-700 mb-4">{blog.content}</p>

              {blog.media.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {blog.media.map((media, index) => (
                    <div key={index} className="flex flex-col">
                      <img src={media.data} alt={media.name} className="object-cover rounded-md" />
                      <p className="text-xs text-gray-500 mt-1">{media.name} ({media.mimeType})</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 text-sm text-gray-500">{blog.likes.length} Likes</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

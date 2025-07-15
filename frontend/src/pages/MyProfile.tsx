import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import isLoggedIn from "../functions/loggedin";
import { Button } from "@headlessui/react";

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
  const token = localStorage.getItem("authtoken");
  const navigate = useNavigate();
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
    console.log(response.data.post);
    setBlogs(response.data.post);
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
    <div className="p-4 bg-gradient-to-br from-indigo-100 via-white to-indigo-300 flex items-center gap-x-4 h-screen w-full">
      <div className="bg-white flex flex-col shadow-2xl  rounded-xl w-2/3 h-full">
        <Button
          onClick={handleBackButton}
          className="flex items-center gap-2 mt-4 ml-8 text-gray-700 hover:text-indigo-600 transition"
        >
          <FaArrowLeft />
          <span>Back</span>
        </Button>
        <div className="flex items-center h-1/3 w-full border-b-2 border-gray-700">
          <div className="max-w-1/3 flex items-center justify-center m-12">
            {userinfo?.profilePicture ? (
              <img
                src={userinfo?.profilePicture}
                alt="profilepicture"
                className="w-36 h-36 object-cover rounded-full"
              />
            ) : (
              <img
                src="images/profilepic.webp"
                alt="profilepicture"
                className="w-36 h-36 object-cover rounded-full"
              />
            )}
          </div>
          <div className="max-w-2/3 flex flex-col items-start space-y-8 mx-6">
            <h1 className="text-3xl  text-gray-900">{userinfo?.username}</h1>
            <h3 className="text-2xl text-gray-500">{userinfo?.email}</h3>
            <p className="text-lg text-gray-700">{userinfo?.bio}</p>
          </div>
        </div>
        <div className="flex items-center h-2/3 w-full"></div>
      </div>
      <div className="bg-white shadow-2xl rounded-xl w-1/3 h-full flex flex-col">
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Subscriptions
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {userinfo?.subscriptions && userinfo.subscriptions.length > 0 ? (
            <ul className="w-full space-y-2">
              {userinfo.subscriptions.map((sub, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg"
                >
                  <img
                    src={sub.profilePicture}
                    alt={`${sub.username}'s profile`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <span className="text-gray-700">{sub.username}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              No subscriptions, subscribe to your favourite bloggers to stay
              updated
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

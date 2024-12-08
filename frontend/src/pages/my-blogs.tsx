import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { HiMenu } from "react-icons/hi";

interface Blog {
  id: number;
  title: string;
  author: { username: string };
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  published: boolean;
  tags: { name: string; id: number }[];
}

const myBlogs = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [user, setUser] = useState<string>("Guest");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toggleMenu = () => setShowMenu(!showMenu);
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }


    const getBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/blogs/my-blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data);

      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
      }
    };
    const getUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User Info:", response.data.data);
        const { username } = response.data.data;
        console.log("User Info Username:", username);
        setUser(username);
      } catch (err) {
        setError("Failed to load user info.");
      }
    };


    const getProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/blogs/profiles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usernames = response.data.map((profile: { author: { username: string } }) => profile.author.username);
        console.log("Extracted Usernames:", usernames);
        setProfiles(usernames);

      } catch (err) {
        setError("Failed to load profiles info.");
      }
    };

    console.log("User:", user, "User Type:", typeof user);

    getBlogs();
    getUserInfo();
    getProfiles();
  }, [token]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="bg-black text-white flex items-center justify-between px-4 py-3 shadow-md border-b border-white">
        <button className="text-2xl font-bold font-['Merriweather', 'serif']" onClick={() => navigate('/home')}>MyBlog</button>
        <input type="text" placeholder="Search..." className="w-1/3 px-4 py-2 rounded-full text-black focus:outline-none" />
        <button onClick={toggleMenu} className="text-lg hover:text-sky-400 transition-colors">
          <HiMenu size={24} />
        </button>
      </header>

      {error && (
        <div className="bg-red-500 text-white text-center py-2">
          {error}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 bg-black p-6 overflow-y-auto border-r border-white">
          <h2 className="font-semibold text-xl mb-4 text-sky-400">Trending Profiles</h2>
          <ul>
            {profiles.map((profile) => (
              <li className="mb-3" key={profile}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-600 rounded-full"></div>
                  <span className="hover:text-sky-400 transition-colors">{profile}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 bg-black p-6 overflow-y-auto">
          {blogs.map((blog) => {
            return (
              <div key={blog.id} className="border border-white p-6 rounded-md mb-6 bg-black">
                <h3 className="font-bold text-2xl mb-2 text-sky-400">{blog.title}</h3>
                <p className="text-gray-400 mb-2">by {blog.author.username} on {blog.createdAt}</p>
                <p className="text-gray-300">
                  {typeof blog.content === "string"
                    ? expanded === blog.id
                      ? blog.content
                      : `${blog.content.slice(0, 100)}...`
                    : "Content not available"}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <button className="text-sky-400 hover:underline" onClick={() => toggleExpand(blog.id)}>
                    {expanded === blog.id ? 'Show Less' : 'Read More'}
                  </button>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">❤️ <span>{blog.likes}</span></button>
                    <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">💬 <span>{blog.comments}</span></button>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {showMenu && (
        <div className="fixed top-0 right-0 w-64 h-full bg-black text-white p-4 z-50 shadow-lg">
          <button className="mb-6 text-right hover:text-sky-400 transition-colors" onClick={toggleMenu}>✖</button>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-sky-600 rounded-full"></div>
            <span className="ml-3 text-white">{user}</span>
          </div>
          <ul className="space-y-4">
            <li className="hover:text-sky-400 transition-colors cursor-pointer" onClick={() => navigate('/home')}>Home</li>
            <li className="hover:text-sky-400 transition-colors cursor-pointer" onClick={() => navigate('/post')}>Create a blog</li>
            <li className="hover:text-sky-400 transition-colors cursor-pointer" onClick={() => navigate('/trending')}>Discover More</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default myBlogs;

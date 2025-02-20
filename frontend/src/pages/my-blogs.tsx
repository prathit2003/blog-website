import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiMenu } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5"; import { FaUserCircle } from "react-icons/fa";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchBar from "../components/searchbar";
import LoadingSkeleton from "../components/loadingskeleton";
import isLoggedIn from "../functions/loggedin";

interface Media {
  name: string;
  mimeType: string;
  data: string;
}
interface profile {
  username: string;
  profilepictureurl: string;
}
interface comment {
  content: string;
  authorId: number;
}
interface likes {
  authorId: number;
  postId: number;
}
interface Blog {
  id: number;
  title: string;
  author: {
    username: string,
    profilepictureurl: string;
  };
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  media: Media[];
  likes: likes[];
  comments: comment[];
  published: boolean;
  tags: { name: string; id: number }[];
}

const Blogs = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [profiles, setProfiles] = useState<profile[]>([]);
  const [isempty, setempty] = useState(false);
  const [profilepictureurl, setprofilepictureurl] = useState("");

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string>("Guest");
  const [error, setError] = useState<string | null>(null);
  const [hiddenBlogs, setHiddenBlogs] = useState<number[]>([]);
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null);
  const [likedBlogs, setLikedBlogs] = useState<number[]>([]);
  const [activeBlogId, setActiveBlogId] = useState<number | null>(null);

  const toggleMenu = () => setShowMenu(!showMenu);
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (!token || !isLoggedIn()) {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const [blogsRes, userRes, profilesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/v1/blogs/my-blogs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/v1/user/info", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/v1/blogs/profiles", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        console.log(blogsRes.data.post);
        console.log(userRes.data.data.username);
        console.log(profilesRes.data);
        if (!blogsRes.data || blogsRes.data.length === 0) {
          setempty(true);
        }
        setBlogs(blogsRes.data.post);
        setLikedBlogs(blogsRes.data.blogIds);
        setprofilepictureurl(userRes.data.data.profilePicture);
        setUser(userRes.data.data.username);
        const mappedProfiles: profile[] = profilesRes.data.map((post: any) => ({
          username: post.author.username,
          profilepictureurl: post.author.profilePicture,
        }));
        setProfiles(mappedProfiles);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleHideBlog = (blogId: number) => {
    setHiddenBlogs((prev) => [...prev, blogId]);
    setVisibleMenu(null);
  };

  const handleLikes = (blogId: number) => {
    setLikedBlogs((prev) =>
      prev.includes(blogId) ? prev.filter((id) => id !== blogId) : [...prev, blogId]
    );
  };

  const handleComment = async (blogId: number) => {
    setActiveBlogId(blogId);
    const response = await axios.get(`http://localhost:3000/api/v1/blogs/my-blogs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBlogs(response.data);
  };

  const handleShare = (blogId: number) => {
    console.log(`Blog shared: ${blogId}`);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="flex flex-col h-screen bg-[#22223B] text-[#F2E9E4]" style={{ scrollBehavior: "smooth" }}>
      <header className="flex items-center justify-between px-4 py-3 shadow-md border-b border-[#F2E9E4]">
        <button
          className="text-2xl font-bold font-merriweather"
          onClick={() => navigate("/home")}
        >
          MyBlog
        </button>
        <SearchBar setBlogs={setBlogs} />
        <button onClick={toggleMenu} className="text-lg hover:text-sky-400">
          <HiMenu size={24} />
        </button>
      </header>

      {error && <div className="bg-red-500 text-center py-2">{error}</div>}

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 p-6 border-r border-[#F2E9E4] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-sky-400">Trending Profiles</h2>
          <ul>
            {profiles.map((profile) => (
              <li key={profile.username} className="mb-3 flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-sky-600 rounded-full"
                  style={{
                    backgroundImage: `url(${profile.profilepictureurl || '/default-profile.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <span className="hover:text-sky-400">{profile.username}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {blogs
            .filter((blog) => !hiddenBlogs.includes(blog.id))
            .map((blog) => (
              <div
                key={blog.id}
                className="mb-6 p-6 border border-[#F2E9E4] bg-[#22223B] rounded-md hover:scale-102 transform transition-transform"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-600 rounded-full"></div>
                    <div>
                      <h4 className="font-bold">{blog.author.username}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(blog.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      className="hover:text-sky-400"
                      onClick={() =>
                        setVisibleMenu(visibleMenu === blog.id ? null : blog.id)
                      }
                    >
                      <BsThreeDotsVertical size={20} />
                    </button>
                    {visibleMenu === blog.id && (
                      <div className="absolute right-0 mt-2 w-24 bg-[#22223B] border border-[#F2E9E4] rounded-md shadow-lg">
                        <button
                          className="block w-full px-2 py-1 text-sm hover:bg-yellow-500 hover:text-[#22223B]"
                          onClick={() => handleHideBlog(blog.id)}
                        >
                          Hide
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-bold">{blog.title}</h3>
                <p className="mt-2 text-gray-300">{blog.content}</p>

                {blog.media?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {blog.media.map((media, index) => (
                      <div
                        key={index}
                        className="w-full h-40 bg-cover bg-center rounded-md"
                        style={{
                          backgroundImage: `url(${`data:${media.mimeType};base64,${media.data}`})`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-4">
                    <button
                      className={`flex items-center gap-2 ${likedBlogs.includes(blog.id) ? "text-red-500" : "hover:text-sky-400"
                        } transition-colors duration-300`}
                      onClick={() => handleLikes(blog.id)}
                    >
                      <IoHeartOutline />
                      <span>Like ({blog.likes.length})</span>
                    </button>
                    <button
                      className="flex items-center gap-2 hover:text-sky-400"
                      onClick={() => handleComment(blog.id)}
                    >
                      <FaCommentAlt />
                      <span>Comment ({blog.comments.length})</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-sky-400" onClick={() => handleShare(blog.id)}>
                      <FaShare />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {activeBlogId === blog.id && (
                  <div className="mt-4 p-4 border border-sky-400 rounded-lg bg-[#1A1A2E]">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                      <span className="ml-3 text-sky-400">{blog.authorId}</span>
                    </div>
                    <textarea
                      className="w-full p-2 border border-gray-500 rounded-lg bg-[#22223B] text-white"
                      placeholder="Write your comment here..."
                    />
                    <button className="mt-3 bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-500">
                      Post Comment
                    </button>
                  </div>
                )}
              </div>
            ))}
          {isempty && (
            <div className="flex flex-col items-center justify-center h-full text-center bg-[#22223B] text-[#F2E9E4]">
              <h2 className="text-2xl font-semibold mb-4">No Blogs Yet</h2>
              <p className="text-sm mb-6">
                Start your blogging journey by creating your first blog now.
              </p>
              <button
                onClick={() => navigate("/post")}
                className="bg-sky-400 text-[#22223B] px-4 py-2 rounded-md font-medium hover:bg-sky-500"
              >
                Create a Blog
              </button>
            </div>
          )}

          <a
            href="/trending"
            className="text-sky-400 hover:text-sky-500 transition-colors duration-300 block text-center mt-6"
          >
            Discover More
          </a>
        </main>
      </div>

      {showMenu && (
        <div className="fixed top-0 right-0 w-64 h-full bg-[#22223B] p-4 z-50 shadow-lg">
          <button className="mb-6 text-right hover:text-sky-400" onClick={toggleMenu}>
            ✖
          </button>
          <div className="flex items-center mb-6">
            {profilepictureurl ? (
              <img
                src={profilepictureurl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-[#F2E9E4]"
              />
            ) : (
              <FaUserCircle className="text-[#F2E9E4] text-3xl" />
            )}
            <span className="ml-3">{user}</span>
          </div>
          <ul className="space-y-4">
            <li
              className="hover:text-sky-400 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Home
            </li>
            <li
              className="hover:text-sky-400 cursor-pointer"
              onClick={() => navigate("/post")}
            >
              Create a blog
            </li>
            <li
              className="hover:text-sky-400 cursor-pointer"
              onClick={() => navigate("/my-blogs")}
            >
              Your blogs
            </li>
            <li
              className="hover:text-sky-400 cursor-pointer"
              onClick={() => navigate("/trending")}
            >
              Discover More
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Blogs;

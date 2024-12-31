import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiMenu } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";
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

interface Blog {
   id: number;
   title: string;
   author: { username: string };
   authorId: number;
   content: string;
   createdAt: string;
   updatedAt: string;
   media: Media[];
   likes: number;
   comments: number;
   published: boolean;
   tags: { name: string; id: number }[];
}

const Blogs = () => {
   const [showMenu, setShowMenu] = useState(false);
   const [blogs, setBlogs] = useState<Blog[]>([]);
   const [profiles, setProfiles] = useState<string[]>([]);
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<string>("Guest");
   const [error, setError] = useState<string | null>(null);
   const [hiddenBlogs, setHiddenBlogs] = useState<number[]>([]);
   const [visibleMenu, setVisibleMenu] = useState<number | null>(null);

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
               axios.get("http://localhost:3000/api/v1/blogs/trending", {
                  headers: { Authorization: `Bearer ${token}` },
               }),
               axios.get("http://localhost:3000/api/v1/user/info", {
                  headers: { Authorization: `Bearer ${token}` },
               }),
               axios.get("http://localhost:3000/api/v1/blogs/profiles", {
                  headers: { Authorization: `Bearer ${token}` },
               }),
            ]);

            setBlogs(blogsRes.data);
            setUser(userRes.data.data.username);
            setProfiles(
               profilesRes.data.map(
                  (profile: { author: { username: string } }) => profile.author.username
               )
            );
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

   if (loading) return <LoadingSkeleton />;

   return (
      <div className="flex flex-col h-screen bg-[#22223B] text-[#F2E9E4]">

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

         {/* Error Banner */}
         {error && <div className="bg-red-500 text-center py-2">{error}</div>}

         <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-1/4 p-6 border-r border-[#F2E9E4] overflow-y-auto">
               <h2 className="text-xl font-semibold mb-4 text-sky-400">Trending Profiles</h2>
               <ul>
                  {profiles.map((profile) => (
                     <li key={profile} className="mb-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-600 rounded-full"></div>
                        <span className="hover:text-sky-400">{profile}</span>
                     </li>
                  ))}
               </ul>
            </aside>

            {/* Main Content */}
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
                              <button className="flex items-center gap-2 hover:text-sky-400">
                                 <IoHeartOutline />
                                 <span>Like ({blog.likes})</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-sky-400">
                                 <FaCommentAlt />
                                 <span>Comment ({blog.comments})</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-sky-400">
                                 <FaShare />
                                 <span>Share</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
            </main>
         </div>

         {/* Menu */}
         {showMenu && (
            <div className="fixed top-0 right-0 w-64 h-full bg-[#22223B] p-4 z-50 shadow-lg">
               <button className="mb-6 text-right hover:text-sky-400" onClick={toggleMenu}>
                  ✖
               </button>
               <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-sky-600 rounded-full"></div>
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

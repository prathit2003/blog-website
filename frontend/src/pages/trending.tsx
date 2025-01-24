import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from 'react-icons/fa';
import { HiMenu } from "react-icons/hi";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
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
   const [likedblogs, setlikedblogs] = useState<number[]>([]);
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<string>("Guest");
   const [error, setError] = useState<string | null>(null);
   const [hiddenBlogs, setHiddenBlogs] = useState<number[]>([]);
   const [visibleMenu, setVisibleMenu] = useState<number | null>(null);
   const [profilepictureurl, setprofilepictureurl] = useState("");
   const [visibleComments, setVisibleComments] = useState<number | null>(null);
   const [commentInput, setCommentInput] = useState<string>("");
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

            setBlogs(blogsRes.data.top10post);
            setlikedblogs(blogsRes.data.blogIds);
            setUser(userRes.data.data.username);
            setprofilepictureurl(userRes.data.data.profilePicture);
            const mappedprofiles: profile[] = profilesRes.data.map((post: any) => (
               {
                  username: post.author.username,
                  profilepictureurl: post.author.profilePicture,
               }
            ))
            setProfiles(mappedprofiles);
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

   const toggleComments = (blogId: number) => {
      setVisibleComments(visibleComments === blogId ? null : blogId);
   };
   const handlelikes = async (blogId: number) => {
      try {
         const response = await axios.post(`http://localhost:3000/api/v1/blogs/${blogId}/updatelikes`, {

         }, {
            headers: { Authorization: `Bearer ${token}` },
         })
         const updatedBlog = response.data;

         setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
               blog.id === updatedBlog.id ? updatedBlog : blog
            )
         );
      } catch (err) {
         console.log(err);
      }
   }

   const handleAddComment = async (blogId: number) => {
      if (!commentInput.trim()) return;
      try {
         const response = await axios.post(`http://localhost:3000/api/v1/blogs/${blogId}/updatecomments`, {
            content: commentInput
         }, {
            headers: { Authorization: `Bearer ${token}` },
         })
         const updatedBlog = response.data;

         setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
               blog.id === updatedBlog.id ? updatedBlog : blog
            ))
      }
      catch (err) {
         console.log(err);
      }
      setCommentInput("");
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

         {error && <div className="bg-red-500 text-center py-2">{error}</div>}

         <div className="flex flex-1 overflow-hidden">

            <aside className="w-1/4 p-6 border-r border-[#F2E9E4] overflow-y-auto">
               <h2 className="text-xl font-semibold mb-4 text-sky-400">Trending Profiles</h2>
               <ul>
                  {profiles.map((profile) => (
                     <li key={profile.username} className="mb-3 flex items-center gap-3">
                        <div className="w-10 h-10 flex justify-center items-center bg-sky-600 rounded-full">
                           {profile.profilepictureurl ? (
                              <img
                                 src={profile.profilepictureurl}
                                 alt={`${profile.username}'s profile`}
                                 className="w-full h-full rounded-full object-cover"
                              />
                           ) : (
                              <FaUserCircle className="text-white text-3xl" />
                           )}
                        </div>
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
                                 className={`flex items-center gap-2 ${likedblogs.includes(blog.id) ? "text-red-500" : "hover:text-sky-400"
                                    }`}
                                 onClick={() => {
                                    handlelikes(blog.id);
                                 }}
                              >
                                 {likedblogs.includes(blog.id) ? (
                                    <IoHeartSharp className="text-xl" />
                                 ) : (
                                    <IoHeartOutline className="text-xl" />
                                 )}
                                 <span>Like ({blog.likes.length})</span>
                              </button>
                              <button
                                 className="flex items-center gap-2 hover:text-sky-400"
                                 onClick={() => toggleComments(blog.id)}
                              >
                                 <FaCommentAlt />
                                 <span>Comment ({blog.comments ? blog.comments.length : 0})</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-sky-400">
                                 <FaShare />
                                 <span>Share</span>
                              </button>
                           </div>
                        </div>
                        {visibleComments === blog.id && (
                           <div className="mt-4 border-t border-gray-600 pt-4">
                              <h4 className="font-semibold mb-2">Comments</h4>

                              {(!blog.comments || blog.comments.length === 0) ? (
                                 <p className="text-sm text-gray-400 mb-4">No comments available.</p>
                              ) : (
                                 <ul className="space-y-4">
                                    {blog.comments.map((comment, index) => (
                                       <li key={index} className="flex items-start gap-3">

                                          <div className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0"></div>
                                          <div>

                                             <p className="text-sm font-semibold text-sky-400">
                                                User ID: {comment.authorId}
                                             </p>

                                             <p className="text-sm text-gray-300">{comment.content}</p>
                                          </div>
                                       </li>
                                    ))}
                                 </ul>
                              )}

                              <div className="mt-4 flex gap-2">
                                 <input
                                    type="text"
                                    className="flex-1 px-2 py-1 bg-gray-700 border border-gray-500 rounded-md text-gray-200"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    placeholder="Add a comment"
                                 />
                                 <button
                                    className="px-4 py-1 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                                    onClick={() => handleAddComment(blog.id)}
                                 >
                                    Post
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  ))}
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

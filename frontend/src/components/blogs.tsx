import { Blog } from "../types/blogtypes";
import { FaHeart, FaCommentAlt, FaRegBookmark } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";

type BlogsProps = {
  blog: Blog;
  setBlogId: React.Dispatch<React.SetStateAction<number>>;
  state: string;
  setUpdatePopup: React.Dispatch<React.SetStateAction<boolean>>;
};
const Blogs = ({ blog, setBlogId, state, setUpdatePopup }: BlogsProps) => {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".options-menu")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLike = () => {
    // Handle like action
    console.log(`Liked blog with ID: ${blog.id}`);
  };
  const onComment = () => {
    // Handle comment action
    console.log(`Commented on blog with ID: ${blog.id}`);
  };
  const onBookmark = () => {
    // Handle bookmark action
    console.log(`Bookmarked blog with ID: ${blog.id}`);
  };

  function handleDelete(blogid: number): void {
    try {
      axios
        .delete(`http://localhost:3000/api/v1/blog/${blogid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        })
        .then(() => {
          // Optionally, you can redirect or update the UI after deletion
        });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }

  return (
    <div className="h-full w-full py-4 px-8">
      <div className="bg-white h-1/2 pl-6 pr-2 py-4 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300">
        {/* Author */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <img
              src={
                blog.author.profilepictureurl
                  ? blog.author.profilepictureurl
                  : "images/profilepic.webp"
              }
              alt={blog.author.username}
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {blog.author.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          {state === "myblogs" && (
            <div className="relative flex items-center justify-center p-1 mx-4 options-menu">
              <PiDotsThreeOutlineVerticalFill
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition"
                onClick={() => setShowOptions((prev) => !prev)}
              />

              {showOptions && (
                <div className="absolute right-0 top-6 mt-2 w-32 bg-white border rounded-xl shadow-lg z-20">
                  <button
                    onClick={() => {
                      setUpdatePopup(true);
                      setBlogId(blog.id);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-indigo-100 transition rounded-t-xl"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-100 transition rounded-b-xl text-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-sm lg:text-lg text-gray-800 mb-2">{blog.title}</h2>
        {/* Media */}
        {blog.media.length > 0 &&
          blog.media[0].mimeType.startsWith("image/") && (
            <img
              src={`data:${blog.media[0].mimeType};base64,${blog.media[0].data}`}
              alt={blog.media[0].name}
              className="h-1/4 aspect-video max-h-40 object-cover rounded-lg mb-4"
            />
          )}

        {/* Content */}
        <p className="text-gray-700 mb-4 w-fit line-clamp-4">{blog.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Actions: Like, Comment, Bookmark */}
        <div className="flex items-center justify-around border-t pt-4 text-gray-600 text-sm">
          <button
            onClick={onLike}
            className="flex items-center gap-2 hover:text-indigo-800 transition-colors"
          >
            <FaHeart />
            <span>{blog.likes.length} Likes</span>
          </button>

          <button
            onClick={onComment}
            className="flex items-center gap-2 hover:text-indigo-800 transition-colors"
          >
            <FaCommentAlt />
            <span>{blog.comments.length} Comments</span>
          </button>

          <button
            onClick={onBookmark}
            className="flex items-center gap-2 hover:text-indigo-800 transition-colors"
          >
            <FaRegBookmark />
            <span>Bookmark</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

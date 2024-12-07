import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishStatus, setPublishStatus] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const extractedTags = content.match(/#\w+/g) || [];
    setTags(extractedTags);
  }, [content]);

  const handlePostSubmit = async () => {
    try {
      const token = localStorage.getItem("authtoken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/v1/blogs/post",
        {
          title: title,
          content: content,
          published: publishStatus,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      navigate("/home");
      alert(response.data.message);
    } catch (err) {
      console.error("Error sending post data:", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-black border border-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Create a New Post</h1>

        <form className="space-y-4">

          <div>
            <label htmlFor="title" className="text-lg font-semibold text-white">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              placeholder="Enter the title of your post"
              className="w-full px-4 py-2 mt-2 border border-white rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="content" className="text-lg font-semibold text-white">
              Post Content
            </label>
            <textarea
              id="content"
              value={content}
              placeholder="Write the content of your post here"
              className="w-full px-4 py-2 mt-2 border border-white rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
              rows={6}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>


          <div>
            <label className="text-lg font-semibold text-white">Tags</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-white rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>


          <div>
            <label className="text-lg font-semibold text-white">Publish Post</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="published"
                checked={publishStatus}
                onChange={(e) => setPublishStatus(e.target.checked)}
                className="h-5 w-5 text-white bg-black border-white rounded focus:ring-white"
              />
              <span className="ml-2 text-sm text-white">
                Check this box to publish the post immediately.
              </span>
            </div>
          </div>

          <div>
            <label className="text-lg font-semibold text-white">Popular Tags</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["#tech", "#coding", "#design", "#health", "#travel"].map(
                (tag, index) => (
                  <button
                    key={index}
                    type="button"
                    className="px-2 py-1 border border-white rounded text-sm bg-black text-white hover:bg-white hover:text-black transition-colors"
                    onClick={() => setContent((prev) => `${prev} ${tag}`)}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>


          <button
            type="button"
            className="w-full py-2 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition duration-300"
            onClick={handlePostSubmit}
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;

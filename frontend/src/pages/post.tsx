import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaImage, FaVideo } from "react-icons/fa";

const Post: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toggle, setToggle] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [publishStatus, setPublishStatus] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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

      if (!title || !content) {
        alert("Title and content are required.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("published", publishStatus.toString());
      formData.append("tags", JSON.stringify(tags));
      if (media) {
        formData.append("media", media);
      }

      // Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/blogs/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response data:", response.data);
      navigate("/blogs");
      alert(response.data.message);
    } catch (err) {
      console.error("Error sending post data:", err);
    }
  };


  const handleMediaToggle = () => {
    setToggle(!toggle);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length > 4) {
        alert("You can upload a maximum of 4 files.");
        return;
      }
      setMedia(event.target.files[0]);
      console.log("Selected file:", event.target.files[0]);
    }
  };

  const triggerImagePicker = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const triggerVideoPicker = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
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
            <label className="text-lg font-semibold text-white">Upload Media</label>
            <button
              type="button"
              className="flex items-center justify-center mt-2 px-4 py-2 border border-white rounded-md bg-black text-white hover:bg-white hover:text-black transition-colors"
              onClick={handleMediaToggle}
            >
              <MdFileUpload className="mr-2" />
              Upload Media
            </button>
            {toggle && (
              <div className="mt-2 p-4 bg-black border border-white rounded-md flex gap-4">
                <div
                  className="cursor-pointer flex flex-col items-center"
                  onClick={triggerImagePicker}
                >
                  <FaImage size={30} className="text-white" />
                  <span className="text-sm text-white">Image</span>
                </div>
                <div
                  className="cursor-pointer flex flex-col items-center"
                  onClick={triggerVideoPicker}
                >
                  <FaVideo size={30} className="text-white" />
                  <span className="text-sm text-white">Video</span>
                </div>
                <input
                  type="file"
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <input
                  type="file"
                  ref={videoInputRef}
                  style={{ display: "none" }}
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
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

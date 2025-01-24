
import { FiArrowLeft, FiCamera, FiMoreVertical } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";


const MyProfile = () => {
  const navigate = useNavigate();
  const user = {
    name: "John Doe",
    bio: "Travel blogger & photographer.",
    subscriptions: "Premium Member",
    blogs: [
      { id: 1, title: "Exploring the Alps", content: "An amazing experience!" },
      { id: 2, title: "Top 10 Beaches", content: "Must-visit destinations." },
    ],
  };
  const handleEdit = (id: number) => alert(`Edit Blog ID: ${id}`);
  const handleDelete = (id: number) => alert(`Delete Blog ID: ${id}`);

  return (<div className="profile-page p-6 max-w-4xl mx-auto">

    <button
      className="text-xl flex items-center mb-4"
      onClick={() => navigate(-1)}
    >
      <FiArrowLeft className="mr-2" />
      Back
    </button>

    <div className="profile-section flex items-center mb-6">
      <div className="relative">

        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full border"
        />

        <FiCamera className="absolute bottom-2 right-2 bg-white p-1 rounded-full border cursor-pointer" />
      </div>
      <div className="ml-6">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-gray-600">{user.bio}</p>
        <p className="text-sm text-gray-500">{user.subscriptions}</p>
      </div>
    </div>


    <div className="blog-section">
      <h2 className="text-xl font-semibold mb-4">My Blogs</h2>
      {user.blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog-card border p-4 mb-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p className="text-gray-600">{blog.content}</p>
          </div>
          {/* Three Dots Menu */}
          <div className="relative">
            <button className="p-2">
              <FiMoreVertical />
            </button>
            <div className="menu hidden">
              <button
                className="block text-red-500"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </button>
              <button
                className="block text-blue-500"
                onClick={() => handleEdit(blog.id)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}


      <div className="text-center mt-6">
        <p className="text-gray-500">Want to explore more blogs?</p>
        <Link
          to="/trending"
          className="text-blue-500 underline font-semibold"
        >
          Go to Trending Page
        </Link>
      </div>
    </div>
  </div>)
}

export default MyProfile;
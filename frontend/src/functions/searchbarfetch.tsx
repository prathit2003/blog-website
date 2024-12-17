import axios from "axios";

const handleSearch = async (word: string) => {
  const token = localStorage.getItem("authtoken");

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/blogs/searchblogs",
      { words: word },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching blogs:", error);
    throw error;
  }
};

export default handleSearch;

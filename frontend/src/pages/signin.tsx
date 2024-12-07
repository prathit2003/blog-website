import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignIn: React.FC = () => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handlesignin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        email: Email,
        password: password,
      });


      const { token, message } = response.data;
      localStorage.setItem("authToken", token);
      alert(message);
      navigate("/home");

    } catch (err: any) {
      if (err.response) {
        console.error("API error:", err.response.data);
        alert(err.response.data.message || "An error occurred while signing in.");
      } else {
        console.error("Unexpected error:", err.message);
        alert("Unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <>

      <div className="bg-[#fcfcfc] text-black min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          <div className="space-y-4">

            <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
              Sign in with Google
            </button>


            <button className="w-full py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300">
              Sign in with GitHub
            </button>


            <div className="mt-4 space-y-2">
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md" onChange={(e: any) => {
                setEmail(e.target.value);
              }} />
              <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" onChange={(e: any) => {
                setpassword(e.target.value);
              }} />
              <button className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 " onClick={handlesignin} >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
};

export default SignIn;

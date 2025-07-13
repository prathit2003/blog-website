import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, seterror] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handlesignup = async (event: React.FormEvent) => {
    event.preventDefault();
    seterror("");
    if (password !== confirmpassword) {
      seterror("passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          email: email,
          password: password,
          username: username,
        }
      );
      const { message, token, refreshtoken } = response.data;
      localStorage.setItem("authtoken", token);
      localStorage.setItem("refreshtoken", refreshtoken);
      setSuccess(message);
      navigate("/home");
    } catch (err: any) {
      seterror(err.response?.data?.message || "an error occured during signup");
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4 py-12">
        <div className="absolute inset-0 z-10 overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-400 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                id="blogverse-pattern"
                x="50%"
                y={-1}
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#blogverse-pattern)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <div className="bg-white flex flex-col items-center justify-evenly z-20 rounded-lg shadow-xl max-w-sm">
          <img
            src="images/login.jpg"
            alt="design for signup page"
            className="w-full max-h-48 object-cover rounded-t-lg"
          />
          <div className="w-full px-6 pb-8">
            <h1 className="text-3xl text-center mt-4 font-bold mb-6">
              Sign Up
            </h1>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="username"
                value={username}
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e: any) => {
                  setusername(e.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e: any) => {
                  setemail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e: any) => {
                  setpassword(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e: any) => {
                  setconfirmpassword(e.target.value);
                }}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <button
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                onClick={handlesignup}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

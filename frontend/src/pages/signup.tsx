import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstname, setfirstname] = useState("");
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
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        email: email,
        password: password,
        firstname: firstname,
        username: username
      })
      const { message, token, refreshtoken } = response.data;
      localStorage.setItem("authtoken", token);
      localStorage.setItem("refreshtoken", refreshtoken);
      setSuccess(message);
      console.log("executed handlesignup");
      navigate("/home");

    } catch (err: any) {
      seterror(err.response?.data?.message || "an error occured during signup");
    }

  };

  return <>

    <div className="bg-[#fcfcfc] text-black min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

        <form className="space-y-4">
          <input type="text" placeholder="firstname"
            value={firstname} className="w-full px-4 py-2 border rounded-md" onChange={(e: any) => {
              setfirstname(e.target.value);
            }} />
          <input type="text" placeholder="username"
            value={username} className="w-full px-4 py-2 border rounded-md" onChange={(e: any) => {
              setusername(e.target.value);
            }} />
          <input type="email" placeholder="Email"
            value={email} className="w-full px-4 py-2 border rounded-md" onChange={(e: any) => {
              setemail(e.target.value);
            }} />
          <input type="password" placeholder="Password"
            value={password} className="w-full px-4 py-2 border rounded-md" onChange={(e: any) => {
              setpassword(e.target.value);
            }} />
          <input type="password" placeholder="Confirm Password"
            value={confirmpassword} className="w-full px-4 py-2 border rounded-md" onChange={(e: any) => {
              setconfirmpassword(e.target.value);
            }} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300" onClick={handlesignup}>
            Sign Up
          </button>
        </form>
      </div>
    </div>

  </>
}

export default SignUp;
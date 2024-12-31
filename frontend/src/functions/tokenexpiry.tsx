import axios from "axios";
const refreshtoken = async (refreshtoken: string) => {

  const response = await axios.get("http://localhost:3000/api/v1/user/token", {
    headers: {
      Authorization: `${refreshtoken}`,
    }
  })
  const token = localStorage.getItem("authtoken");
  console.log(`old token ${token}`);
  console.log("new token:", response.data.authtoken);
  localStorage.setItem("authtoken", response.data.authtoken);
}
export default refreshtoken;
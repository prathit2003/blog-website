import axios from "axios";
const refreshtoken = async (refreshtoken: string) => {

  const response = await axios.get("http://localhost:3000/api/v1/user/token", {
    headers: {
      Authorization: `${refreshtoken}`,
    }
  })
  console.log(response.data.response);
  localStorage.setItem("authtoken", response.data.response);
}
export default refreshtoken;
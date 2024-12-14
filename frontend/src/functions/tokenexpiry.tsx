import axios from "axios";
const refreshtoken = async ({ refreshtoken }: { refreshtoken: string }) => {

  const response = await axios.get("http://localhost:3000/api/v1/user/token", {
    headers: {
      Authorization: `${refreshtoken}`,
    }
  })
  localStorage.setItem("authtoken", response.data);
}
export default refreshtoken;
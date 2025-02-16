import { useNavigate } from 'react-router-dom';


const navigate = useNavigate();

const handleLogoutButton = () => {

  localStorage.removeItem("authtoken");
  localStorage.removeItem("refreshtoken");
  navigate("/home");
};


export default handleLogoutButton;
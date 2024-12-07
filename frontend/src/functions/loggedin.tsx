const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const istokenvalid = payload.exp * 1000 > Date.now();
    return istokenvalid;
  } catch (err) {
    return false;
  }
}

export default isLoggedIn;
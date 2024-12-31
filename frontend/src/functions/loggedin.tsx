const isLoggedIn = () => {
  const token = localStorage.getItem('authtoken');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isTokenValid = payload.exp * 1000 > Date.now();
    return isTokenValid;
  } catch (err) {
    return false;
  }
};

export default isLoggedIn;
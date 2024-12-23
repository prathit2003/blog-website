import { jwtDecode } from "jwt-decode";
import refreshtoken from "./tokenexpiry";
function scheduleTokenRefresh(token: string, reftoken: string) {
  const decoded = jwtDecode<any>(token);
  const expiresAt = decoded.exp ? decoded.exp * 1000 : Date.now() + 5 * 60 * 1000;
  const now = Date.now();
  const timeout = expiresAt - now - 2 * 60 * 1000;

  if (timeout > 0) {
    setTimeout(refreshtoken, timeout);
  } else {
    refreshtoken(reftoken);
  }
}

export default scheduleTokenRefresh;

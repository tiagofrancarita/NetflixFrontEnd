import { Navigate, Outlet } from "react-router-dom";
import { parseJwt } from "../utils/jwtHelper";

const isTokenValid = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  const payload = parseJwt(token);
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000); // segundos
  return payload.exp && payload.exp > now;
};

const PrivateRoute = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

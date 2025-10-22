import { createContext } from "react";
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  loading: false,
});
export default AuthContext;

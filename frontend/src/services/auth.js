import jwt_decode from "jwt-decode";
import { useState, createContext } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  // user contains an id, name, role, and the time the token expires
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = async (email, password) => {
    const res = await fetch("/api/user/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then((x) => x.json());
    if (res.success) {
      setUser(jwt_decode(res.jwt_token));
      setToken(res.jwt_token);
      // localStorage is prone to XSS, but we don't care about security here :)
      // If this were to be a real app, we'd want to store the token in a secure
      // cookie, and implement a refresh token flow.
      localStorage.setItem("token", res.jwt_token);
      localStorage.setItem("user", JSON.stringify(jwt_decode(res.jwt_token)));
    }
    return res;
  }
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
  }
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};
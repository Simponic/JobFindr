import { useContext, createContext } from "react";
import { AuthContext } from "./auth";

export const APIUserContext = createContext();

export const APIUserContextProvider = ({ children }) => {
  const auth = useContext(AuthContext);

  const makeAuthenticatedRequest = async (url, method="GET", body={}) => {
    const options = {
      method: method,
      headers: {},
    }
    if (auth.token) {
      options.headers["Authorization"] = `Bearer ${auth.token}`;
    } else {
      return { success: false, message: "Not authenticated (try logging in again)" };
    }
    if (method === "POST" || method === "PUT") {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    return (await fetch(url, options)).json();
  }

  // eslint-disable-next-line no-unused-vars
  const get = async (url) => {
    return await makeAuthenticatedRequest(url);
  }

  // eslint-disable-next-line no-unused-vars
  const post = async (url, body) => {
    return await makeAuthenticatedRequest(url, "POST", body);
  }

  // eslint-disable-next-line no-unused-vars
  const put = async (url, body) => {
    return await makeAuthenticatedRequest(url, "PUT", body);
  }

  // eslint-disable-next-line no-unused-vars
  const remove = async (url) => {
    return await makeAuthenticatedRequest(url, "DELETE");
  };

  return (
    <APIUserContext.Provider value={{ get, post, put, remove }}>
      {children}
    </APIUserContext.Provider>
  )
};
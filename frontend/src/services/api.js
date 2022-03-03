import { useContext, createContext } from "react";
import { AuthContext } from "./auth";

export const APIUserContext = createContext();

export const APIUserContextProvider = ({ children }) => {
  const auth = useContext(AuthContext);

  const makeAuthenticatedRequest = async (url, method="GET", body={}, options={}) => {
    let request = {
      method: method,
      credentials: "same-origin",
      headers: {},
    }
    if (auth.token) {
      request.headers["Authorization"] = `Bearer ${auth.token}`;
    } else {
      return { success: false, message: "Not authenticated (try logging in again)" };
    }
    if ((method === "POST" || method === "PUT") && !(options.headers && options.body)) {
      request.headers["Content-Type"] = "application/json";
      request.body = JSON.stringify(body);
    }
    request = { ...request, ...options };
    return (await fetch(url, request)).json();
  }

  // eslint-disable-next-line no-unused-vars
  const get = async (url) => {
    return await makeAuthenticatedRequest(url);
  }

  const post = async (url, body, options={}) => {
    return await makeAuthenticatedRequest(url, "POST", body, options);
  }

  // eslint-disable-next-line no-unused-vars
  const put = async (url, body, options={}) => {
    return await makeAuthenticatedRequest(url, "PUT", body, options);
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
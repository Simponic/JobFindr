import jwt_decode from "jwt-decode";
import _ from "lodash";

export const auth = {
  async login(email, password) {
    const res = await fetch("/api/user/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then((x) => x.json());
    if (res.success) {
      localStorage.setItem("token", res.jwt_token);
      localStorage.setItem("token-body", JSON.stringify(jwt_decode(res.jwt_token)));
    }
    return res;
  },
  tokenNotExpired() {
    return Date.now()/1000 < JSON.parse(localStorage.getItem("token-body")).exp;
  },
  async get(url) {
    let res;
    if (this.tokenNotExpired()) {
      res = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((x) => x.json());
    } else {
      this.logout();
      return { success: false, message: "Session expired. Please log in again." };
    }
    return res;
  },
  logout() {
    window.location.reload();
    localStorage.removeItem("token");
    localStorage.removeItem("token-body");
  },
  getUser() {
    let tokenBody = localStorage.getItem("token-body");
    if (tokenBody) {
      return _.pick(JSON.parse(localStorage.getItem("token-body")), ["name", "id", "role"]);
    }
    return null;
  }
};
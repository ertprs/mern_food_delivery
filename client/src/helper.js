import cookie from "js-cookie";

//set cookie
export const setCookie = (key, value) => {
  if (window !== undefined) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove setCookie
export const removeCookie = (key, value) => {
  if (window !== undefined) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get token from cookie
//will be useful when we need to make request to server with tokens
export const getCookie = (key) => {
  if (window !== undefined) {
    return cookie.get(key);
  }
};

//set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing data to cookie and localStorage during signin
export const authenticate = (response, next) => {
  console.log("Authenticate Helper on register response", response);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const logout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

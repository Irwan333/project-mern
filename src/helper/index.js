// import cookie from "js-cookie";

export const signup = (user) => {
  return fetch(`${process.env.REACT_APP_API}/signup`, {
    method: "POST",
    headers: {
      Accept: "aplication/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const setName = (name, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("username", JSON.stringify(name));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

// // memasukkan ke cookie
// export const setCookie = (key, value) => {
//   if (window !== "undefined") {
//     cookie.set(key, value, {
//       expires: 1,
//     });
//   }
// };

// // hapus dari cookie
// export const removeCookie = (key) => {
//   if (window !== "undefined") {
//     cookie.remove(key, {
//       expires: 1,
//     });
//   }
// };

// mengambil data dari cookie
// export const getCookie = (key) => {
//   if (window !== "undefined") {
//     return cookie.get(key);
//   }
// };

// // memasukkan ke localstorage
// export const setLocalStorage = (key, value) => {
//   if (window !== "undefined") {
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// };

// hapus dari localstorage
// export const removeLocalStorage = (key) => {
//   if (window !== "undefined") {
//     localStorage.removeItem(key);
//   }
// };

// otentikasi user melalui passing data ke cookie dan localstorage saat Signin
// export const authenticate = (response, next) => {
//   console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
//   setCookie("token", response.data.token);
//   setLocalStorage("user", response.data.user);
//   next();
// };

// export const authenticate = (jwt, next) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("jwt", JSON.stringify(jwt));
//     next();
//   }
// };

// export const authenticate = (response, next) => {
//   console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
//   setCookie("token", response.data.token);
//   setLocalStorage("user", response.data.user);
//   next();
// };

// akses informasi user dari localstorage
export const isAuth = () => {
  // if (window !== "undefined") {
  //   const cookieChecked = getCookie("token");
  //   if (cookieChecked) {
  //     if (localStorage.getItem("user")) {
  //       return JSON.parse(localStorage.getItem("user"));
  //     } else {
  //       return false;
  //     }
  //   }
  // }

  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

// export const signout = (next) => {
//   // removeCookie("token");
//   // removeLocalStorage("user");
//   // next();

//   if (typeof window !== "undefined") localStorage.removeItem("jwt");
//   next();
//   return fetch(`${process.env.REACT_APP_API}/signout`, {
//     method: "GET",
//   })
//     .then((response) => {
//       console.log("signout", response);
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};

export const forgotPassword = (email) => {
  console.log("email: ", email);
  return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (resetInfo) => {
  return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const socialLogin = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // credentials: "include", // works only in the same origin
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log("signin response: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

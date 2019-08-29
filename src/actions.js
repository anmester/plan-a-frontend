function loginUser(dispatch, user, history) {
  return function() {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer <token>`
      },
      body: JSON.stringify({
        user
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Invalid username or password")
          alert("Invalid username or password. Please try again");
        else {
          localStorage.setItem("token", data.jwt);
          dispatch({ type: "LOGIN_USER", payload: data.user });
          history.push("/welcome");
        }
      });
  };
}

function retrieveUser(dispatch, token, history, location) {
  return function() {
    return fetch("http://localhost:3000/retrieve_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(user => {
        // check for bad user case at some point
        if (user.message) {
          localStorage.removeItem("token");
          alert("Invalid username or password");
        } else {
          dispatch({ type: "RETRIEVE_USER", payload: user });
          if (
            history.location.pathname === "/login" ||
            history.location.pathname === "/signup" ||
            history.location.pathname === "/plana"
          ) {
            history.push("/welcome");
          } else {
            history.push(location.pathname);
          }
        }
      });
  };
}

function signUp(dispatch, user, history) {
  return function() {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
          allergies: user.allergies
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.jwt);
        dispatch({ type: "SIGN_UP_USER", payload: data.user });
        history.push("/welcome");
      });
  };
}

export { loginUser, retrieveUser, signUp };

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
      .then(user => {
        console.log("user", user);
        if (user.message === "Invalid username or password") alert("fuck off");
        else {
          dispatch({ type: "LOGIN_USER", payload: user });
          localStorage.setItem("token", user.jwt);
          history.push("/welcome");
        }
      });
  };
}

function retrieveUser(dispatch, token, history) {
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
        console.log("user", user);
        if (user.message === "Invalid username or password") alert("fuck off");
        else {
          dispatch({ type: "RETRIEVE_USER", payload: user });
          history.push("/welcome");
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
      .then(user => {
        dispatch({ type: "SIGN_IN_USER", payload: user });
        history.push("/welcome");
      });
  };
}

export { loginUser, retrieveUser, signUp };

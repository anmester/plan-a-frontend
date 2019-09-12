// log in user
function loginUser(dispatch, user, history) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
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

// check if user is logged in
function retrieveUser(dispatch, token, history, location) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/retrieve_user`, {
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

// sign up new user
function signUp(dispatch, user, history) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
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

// save plan to store
function createPlan(dispatch, plan) {
  console.log("plan", plan);
  return function() {
    return dispatch({ type: "CREATE_PLAN", payload: plan });
  };
}

// fetch restaurants on category choice
function fetchRestaurants(dispatch) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurants`)
      .then(res => res.json())
      .then(restaurantData => {
        console.log(restaurantData, "restaurantData");
        dispatch({ type: "FETCH_RESTAURANTS", payload: restaurantData });
      });
  };
}

// fetch bars on category choice
function fetchBars(dispatch) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/bars`)
      .then(res => res.json())
      .then(barData => {
        dispatch({ type: "FETCH_BARS", payload: barData });
      });
  };
}

// fetch theaters on category choice
function fetchTheaters(dispatch) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/theaters`)
      .then(res => res.json())
      .then(theaterData => {
        dispatch({ type: "FETCH_THEATERS", payload: theaterData });
      });
  };
}

// fetch galleries on category choice
function fetchGalleries(dispatch) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/galleries`)
      .then(res => res.json())
      .then(galleryData => {
        dispatch({ type: "FETCH_GALLERIES", payload: galleryData });
      });
  };
}

// fetch outdoor events on category choice
function fetchOutdoorEvents(dispatch) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/outdoor-events`)
      .then(res => res.json())
      .then(outdoorEventData => {
        dispatch({ type: "FETCH_OUTDOOR_EVENTS", payload: outdoorEventData });
      });
  };
}

// set selected activity
function setActivity(dispatch, activity) {
  return function() {
    return dispatch({ type: "SET_ACTIVITY", payload: activity });
  };
}

// remove selected activity
function removeActivity(dispatch, targetActivity) {
  return function() {
    return dispatch({ type: "REMOVE_ACTIVITY", payload: targetActivity });
  };
}

// reset activities
function resetActivities(dispatch, activities) {
  return function() {
    return dispatch({ type: "RESET_ACTIVITIES", payload: activities });
  };
}

// create plan
function finalizePlan(dispatch, user, plan, activities) {
  console.log("inside finalize plan in actions", user, plan, activities);
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        plan: {
          user_id: user.id,
          name: plan.planName,
          date: plan.planDate
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("what was posted", data);
        dispatch({ type: "SUBMIT_PLAN", payload: data });
      })
      .then(data => {
        console.log("data returned after post", data);
        addPlanActivities(data, plan, activities);
      });
  };
}

// add plan activities to plan_activities
function addPlanActivities(dispatch, plan, activities) {
  console.log(
    "inside finalize plan in actions",
    "this is activities?",
    activities,
    "this is plan?",
    plan
  );
  return activities.map(activity =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/plan_activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        plan: plan,
        activity: activity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("plan activities", data);
      })
  );
}

// get random plan
function getRandomPlan(dispatch) {
  return function() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/random-plan`)
      .then(res => res.json())
      .then(randomActivities => {
        console.log("random activities", randomActivities);
        dispatch({ type: "GET_RANDOM_ACTIVITIES", payload: randomActivities });
      });
  };
}

export {
  loginUser,
  retrieveUser,
  signUp,
  fetchRestaurants,
  setActivity,
  createPlan,
  finalizePlan,
  addPlanActivities,
  removeActivity,
  fetchTheaters,
  fetchGalleries,
  fetchOutdoorEvents,
  resetActivities,
  fetchBars,
  getRandomPlan
};

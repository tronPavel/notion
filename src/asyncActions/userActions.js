export const loadUser = () => async (dispatch) => {
  dispatch({ type: "USER_LOADING" });

  const userId = localStorage.getItem("userId");
  if (userId) {
    const response = await fetch(`http://localhost:5000/users?id=${userId}`);
    const users = await response.json();
    const user = users[0];
    if (user) {
      dispatch({ type: "USER_LOADED", payload: user });
      return;
    }
  }
  dispatch({ type: "USER_LOADED", payload: null });
};

export const loginUser = (user) => (dispatch) => {
  localStorage.setItem("userId", user.id);
  dispatch({ type: "USER_LOADED", payload: user });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userId");
  dispatch({ type: "USER_LOGOUT" });
};

import api from "../api/api";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_LOGGED_IN = "USER_LOGGED_IN";

export const logOutAction = (payload) => ({
  type: USER_LOGGED_OUT,
  payload,
});

export const logInAction = (payload) => ({
  type: USER_LOGGED_IN,
  payload,
});

export const getOperatorProfile = () => (dispatch) => {
  api.get("/api/auth/operator-profile/").then((response) => {
    dispatch(logInAction(response.data));
  });
};

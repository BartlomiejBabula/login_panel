import api from "../api/api";

import { logOutAction } from "../actions/UserActions";

export const logout = (dispatch, navigate) => {
  const refreshToken = { refresh: localStorage.refresh };
  dispatch(logOutAction());
  localStorage.removeItem("refresh");
  localStorage.removeItem("access");
  api.post("/api/auth/logout/", refreshToken);
  navigate({ pathname: "/" }, { replace: true });
};

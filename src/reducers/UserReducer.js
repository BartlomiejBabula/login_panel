import { USER_LOGGED_IN } from "../actions/UserActions";
import { USER_LOGGED_OUT } from "../actions/UserActions";

const initState = {
  isLogged: false,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return { ...state, ...action.payload, isLogged: true };
    }
    case USER_LOGGED_OUT: {
      return { isLogged: false };
    }
    default:
      return state;
  }
};

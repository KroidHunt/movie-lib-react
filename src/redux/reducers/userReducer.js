import {
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
  USER_SIGN_UP,
  USER_SIGN_UP_FAILED,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_FAILED,
  USER_LOGOUT,
} from "../types";

const initial_state = {
  id: null,
  last_login: null,
  is_superuser: false,
  username: null,
  first_name: null,
  last_name: null,
  email: null,
  is_staff: false,
  is_active: false,
  date_joined: null,
  groups: [],
  user_permissions: [],
  dp: null,
  sign_in_error: null,
  sign_in_error_count: 0,
  signed_in: false,
};

const userReducer = (state = initial_state, { type, payload }) => {
  switch (type) {
    case USER_SIGN_IN:
    case USER_SIGN_UP:
    case UPDATE_USER_DATA:
      return {
        ...state,
        ...payload,
        sign_in_error: null,
        signed_in: true,
        sign_in_error_count: 0,
      };
    case USER_SIGN_IN_FAILED:
    case USER_SIGN_UP_FAILED:
    case UPDATE_USER_DATA_FAILED:
      return {
        ...initial_state,
        sign_in_error: payload,
        sign_in_error_count: state.sign_in_error_count + 1,
      };
    case USER_LOGOUT:
      return {
        ...initial_state,
      };
    default:
      return state;
  }
};

export default userReducer;

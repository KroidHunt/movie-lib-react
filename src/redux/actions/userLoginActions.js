import axios from "axios";
import { getFromLocalStorage, setToLocalStorage } from "../../utils";
import {
  SIGN_IN,
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
  SIGN_UP,
  USER_SIGN_UP,
  USER_SIGN_UP_FAILED,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_FAILED,
  USER_LOGOUT,
} from "../types";

const clearTokens = () => {
  setToLocalStorage("refreshToken", null);
  setToLocalStorage("accessToken", null);
};

const login = ({ dispatch, url, data, type }) => {
  axios
    .post(url, data)
    .then((resp) => {
      setToLocalStorage("refreshToken", resp.data.refresh);
      setToLocalStorage("accessToken", resp.data.access);
      dispatch(updateUserDataUsingToken(type));
    })
    .catch((err) => {
      clearTokens();
      dispatch({
        type: type === SIGN_IN ? USER_SIGN_IN_FAILED : USER_SIGN_UP_FAILED,
        payload:
          type === SIGN_IN ? err.response.data.detail : err.response.data,
      });
    });
};

export const userSignIn =
  ({ username, password }) =>
  (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/api/token/`;
    const data = { username, password };
    login({
      dispatch,
      url,
      data,
      type: SIGN_IN,
    });
  };

export const userSignUp =
  ({ username, password, email, firstname, lastname }) =>
  (dispatch) => {
    const url = `${process.env.REACT_APP_API_URL}/user/profile/new/`;
    const data = {
      username,
      password,
      email,
      first_name: firstname,
      last_name: lastname,
    };
    login({
      dispatch,
      url,
      data,
      type: SIGN_UP,
    });
  };

export const updateUserDataUsingToken = (type) => (dispatch) => {
  const dataUrl = `${process.env.REACT_APP_API_URL}/user/profile/me/`;
  const accessToken = getFromLocalStorage("accessToken");
  if (accessToken !== "null" && accessToken) {
    axios
      .get(dataUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((resp) => {
        dispatch({
          type:
            type === SIGN_IN
              ? USER_SIGN_IN
              : type === SIGN_UP
              ? USER_SIGN_UP
              : UPDATE_USER_DATA,
          payload: resp.data.user,
        });
      })
      .catch((err) => {
        clearTokens();
        dispatch({
          type:
            type === SIGN_IN
              ? USER_SIGN_IN_FAILED
              : type === SIGN_UP
              ? USER_SIGN_UP_FAILED
              : UPDATE_USER_DATA_FAILED,
          payload: err.response.data.detail,
        });
      });
  } else {
    clearTokens();
    dispatch({
      type: UPDATE_USER_DATA_FAILED,
      payload: null,
    });
  }
};

export const logout = () => (dispatch) => {
  clearTokens();
  dispatch({
    type: USER_LOGOUT,
  });
};

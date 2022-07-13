import axios from "../helpers/axios";
import { authConstants } from "./constants";
import jwt_decode from "jwt-decode";

export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post("/admin/signin", { ...data });
      const { token } = res.data;
      const user = jwt_decode(token);
      if (user.role !== "user") {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            email: data.email,
          })
        );
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user: {
              ...user,
              email: data.email,
            },
          },
        });
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: "You are not allow to access this page",
          },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: error.response.data.error || error.response.data.message,
        },
      });
    }
  };
};
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (token) {
      const user = jwt_decode(token);
      console.log({ user2: { ...user, email: userInfo.email } });
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user: { ...user, email: userInfo.email } },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
};

export const forgotPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.FORGOT_PASSWORD_REQUEST });
      await axios.post("/forget-password", { userEmail: data.email });
      dispatch({
        type: authConstants.FORGOT_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: authConstants.FORGOT_PASSWORD_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const changePassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.CHANGE_PASSWORD_REQUEST });
      await axios.post("/change-password", data);
      dispatch({
        type: authConstants.CHANGE_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: authConstants.CHANGE_PASSWORD_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

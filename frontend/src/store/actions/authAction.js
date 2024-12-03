import { jwtDecode } from "jwt-decode";
import eventEmitter from "../../utils/eventEmitter.js";
import { loginUser, registerUser} from "../../../api/api.js";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
  SET_IS_LOGGED_IN: "SET_IS_LOGGED_IN",
  LOGOUT: "LOGOUT",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};
const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: authActions.SET_IS_LOGGED_IN,
    isLoggedIn,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await loginUser(userDetails);
    //console.log("Response:", response);
    if (response.error) {
      eventEmitter.emit("error", response.exception.response.data);
    } else {
      eventEmitter.emit("success");
      const token = response?.data?.token;
      if (!token) {
        console.error("No token received from API");
        return;
      }
      localStorage.setItem("token", token);
      const userDetails = jwtDecode(token);
      console.log(userDetails);
      localStorage.setItem(
        "session",
        JSON.stringify({ isLoggedIn: true, userDetails: userDetails })
      );
      dispatch(setIsLoggedIn(true));
      dispatch(setUserDetails(userDetails));
      navigate("/");
    }
  };
};

const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await registerUser(userDetails);
    console.log(response);
    if (response.error) {
      eventEmitter.emit("error", response.exception.response.data);
    } else {
      eventEmitter.emit("success");
      localStorage.setItem("token", response?.data);
      const userDetails = jwtDecode(response?.data);
      localStorage.setItem(
        "session",
        JSON.stringify({ isLoggedIn: true, userDetails: userDetails })
      );
      dispatch(setIsLoggedIn(true));
      dispatch(setUserDetails(userDetails));
      navigate("/");
    }
  };
};
export const logout = () => {
  console.log(">>>>>>>>>>");
  return {
    type: authActions.LOGOUT,
  };
};

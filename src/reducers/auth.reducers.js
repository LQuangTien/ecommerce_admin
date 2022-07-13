import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: { firstname: "", lastname: "", email: "", picture: "", role: null },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
  isForgotPassword: false,
  forgotPasswordError: null,
  isChangePassword: false,
  changePasswordError: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticating: false,
      };
      break;
    case authConstants.FORGOT_PASSWORD_REQUEST:
      state = {
        ...state,
        isForgotPassword: true,
        forgotPasswordError: null,
      };
      break;
    case authConstants.FORGOT_PASSWORD_SUCCESS:
      state = {
        ...state,
        isForgotPassword: false,
        forgotPasswordError: null,
      };
      break;
    case authConstants.FORGOT_PASSWORD_FAILURE:
      state = {
        ...state,
        isForgotPassword: false,
        forgotPasswordError: action.payload.error,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.CHANGE_PASSWORD_REQUEST:
      state = {
        ...state,
        isChangePassword: true,
      };
      break;
    case authConstants.CHANGE_PASSWORD_SUCCESS:
      state = {
        ...state,
        isChangePassword: false,
      };
      break;
    case authConstants.CHANGE_PASSWORD_FAILURE:
      state = {
        ...state,
        isChangePassword: false,
        changePasswordError: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
export default authReducer;

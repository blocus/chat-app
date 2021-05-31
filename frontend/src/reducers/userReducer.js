import * as Types from './actions/types'

const initialState = {
  user: null,
  sendLogin: false,
  fatalLoginError: false,
  loginError: false,
  userLoaded: false,
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_INFO:
      return {
        ...state,
        user: action.user,
        userLoaded: action.userLoaded,
      }
    case Types.USER_RESET_SEND_LOGIN:
      return {
        ...state,
        sendLogin: false,
        fatalLoginError: false,
        loginError: false,
      }
    case Types.USER_SEND_LOGIN:
      return {
        ...state,
        sendLogin: true,
        fatalLoginError: false,
        loginError: false,
      }
    case Types.USER_LOGIN:
      return {
        ...state,
        user: action.user,
        sendLogin: false,
        fatalLoginError: action.fatalLoginError,
        loginError: action.loginError,
      }

    case Types.USER_LOGOUT:
      return { ...initialState, userLoaded: true }
    default:
      return state
  }
}

export default userReducer

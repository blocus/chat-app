import * as Types from './types'
import axios from 'axios'

export const loginUser = data => dispach => {
  dispach({ type: Types.USER_SEND_LOGIN })
  axios
    .post('/auth/login', data)
    .then(res => {
      localStorage.setItem('refresh_token', res.data.refresh_token)
      localStorage.setItem('token_type', res.data.token_type)
      //  I know refresh token should be i a HTTP only cookie I will manage it if i have time
      localStorage.setItem('access_token', res.data.access_token)
      axios.defaults.headers.common['Authorization'] =
        res.data.token_type + ' ' + res.data.access_token
      axios.defaults.headers.common['Refresh'] = res.data.refresh_token
      refreshUser()
      return dispach({
        type: Types.USER_LOGIN,
        user: res.data.user,
        fatalLoginError: false,
        loginError: false,
      })
    })
    .catch(err => {
      if (err?.response?.status === 401)
        return dispach({ type: Types.USER_LOGIN, fatalLoginError: false, loginError: true })
      return dispach({ type: Types.USER_LOGIN, loginError: false, fatalLoginError: true })
    })
}

export const resetFataError = () => dispach => {
  return dispach({ type: Types.USER_RESET_SEND_LOGIN })
}

export const refreshUser = () => dispach => {
  let access = localStorage.getItem('access_token')
  let refresh = localStorage.getItem('refresh_token')
  let token_type = localStorage.getItem('token_type')
  axios.defaults.headers.common['Authorization'] = token_type + ' ' + access
  axios.defaults.headers.common['Refresh'] = refresh

  axios
    .get('/auth/user-info')
    .then(res => {
      localStorage.setItem('refresh_token', res.data.refresh_token)
      localStorage.setItem('token_type', res.data.token_type)
      //  I know refresh token should be i a HTTP only cookie I will manage it if i have time
      localStorage.setItem('access_token', res.data.access_token)
      axios.defaults.headers.common['Authorization'] =
        res.data.token_type + ' ' + res.data.access_token
      axios.defaults.headers.common['Refresh'] = res.data.refresh_token

      dispach({ type: Types.USER_INFO, user: res.data.user, userLoaded: true })
    })
    .catch(() => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      axios.defaults.headers.common['Authorization'] = ''
      axios.defaults.headers.common['Refresh'] = ''
      dispach({ type: Types.USER_INFO, user: null, userLoaded: true })
    })
}

export const logoutUser = () => dispach => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  axios.defaults.headers.common['Authorization'] = ''
  axios.defaults.headers.common['Refresh'] = ''
  return dispach({ type: Types.USER_LOGOUT })
}

export const updateMyStatus = status => dispach => {
  return dispach({ type: Types.USER_UPDATE_STATUS, status: status })
}

import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import Waiting from './components/Waiting'
import axios from 'axios'
import params from './params.json'
import socketIOClient from 'socket.io-client'

class App extends Component {
  state = {
    user: null,
    loadingUser: true,
  }

  socket = null

  refreshUser = () => {
    let access = localStorage.getItem('access_token')
    let refresh = localStorage.getItem('refresh_token')
    let token_type = localStorage.getItem('token_type')

    axios.defaults.headers.common['Authorization'] = token_type + ' ' + access

    axios.defaults.headers.common['Refresh'] = refresh

    this.setState({ loadingUser: true }, () => {
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
          this.socket = socketIOClient(params.baseUrl, {
            withCredentials: true,
            extraHeaders: {
              authorization: res.data.token_type + ' ' + res.data.access_token,
            },
          })
          this.socket.on('USER_STATUS_UPDATED', status => {
            this.UpdateUserStatus(status)
          })

          this.setState({ user: res.data.user, loadingUser: false })
        })
        .catch(() => {
          this.socket = null
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          this.setState({ user: null, loadingUser: false })
        })
    })
  }

  UpdateUserStatus = status => {
    let user = this.state.user
    user.status = status
    this.setState({ user })
  }

  handleUserStatus = status => {
    this.socket?.emit('USER_STATUS_UPDATE', status)
  }

  componentDidMount() {
    axios.defaults.baseURL = params.baseUrl
    this.refreshUser()
  }

  handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    axios.defaults.headers.common['Authorization'] = ''
    axios.defaults.headers.common['Refresh'] = ''
    this.refreshUser()
  }

  handleLogin = data => {
    localStorage.setItem('refresh_token', data.refresh_token)
    localStorage.setItem('token_type', data.token_type)
    //  I know refresh token should be i a HTTP only cookie I will manage it if i have time
    localStorage.setItem('access_token', data.access_token)
    axios.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token
    axios.defaults.headers.common['Refresh'] = data.refresh_token
    this.refreshUser()
  }

  render() {
    if (this.state.loadingUser) return <Waiting />

    return (
      <Switch>
        <Route path='/auth'>
          <Auth
            user={this.state.user}
            handleLogout={this.handleLogout}
            handleLogin={this.handleLogin}
          />
        </Route>
        <Route>
          <Dashboard handleUserStatus={this.handleUserStatus} user={this.state.user} />
        </Route>
      </Switch>
    )
  }
}

export default App

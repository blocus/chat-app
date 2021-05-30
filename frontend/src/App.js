import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import Waiting from './components/Waiting'
import axios from 'axios'
import params from './params.json'
class App extends Component {
  state = {
    user: null,
    loadingUser: true,
  }

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
          this.setState({ user: res.data.user, loadingUser: false })
        })
        .catch(() => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          this.setState({ user: null, loadingUser: false })
        })
    })
  }

  componentDidMount() {
    axios.defaults.baseURL = params.baseUrl
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
          <Auth user={this.state.user} handleLogin={this.handleLogin} />
        </Route>
        <Route>
          <Dashboard user={this.state.user} />
        </Route>
      </Switch>
    )
  }
}

export default App

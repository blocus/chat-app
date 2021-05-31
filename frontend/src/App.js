import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import Waiting from './components/Waiting'
import axios from 'axios'
import params from './params.json'
import socketIOClient from 'socket.io-client'
import { refreshUser } from './reducers/actions/userActions'
import { connect } from 'react-redux'

class App extends Component {
  state = {
    user: null,
    loadingUser: true,
  }

  socket = null

  UpdateUserStatus = status => {
    let user = this.state.user
    user.status = status
    this.setState({ user })
  }

  handleUserStatus = status => {
    this.socket?.emit('USER_STATUS_UPDATE', status)
  }

  componentDidUpdate(prevProps) {
    // this.socket = socketIOClient(params.baseUrl, {
    //   withCredentials: true,
    //   extraHeaders: {
    //     authorization: res.data.token_type + ' ' + res.data.access_token,
    //   },
    // })
    // this.socket.on('BROADCAST_MY_STATUS', data => console.log(data))
    // this.socket.on('USER_STATUS_UPDATED', status => {
    //   this.UpdateUserStatus(status)
    // })
  }

  componentDidMount() {
    axios.defaults.baseURL = params.baseUrl
    this.props.refreshUser()
  }

  render() {
    if (!this.props.user.userLoaded) return <Waiting />

    return (
      <Switch>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route>
          <Dashboard handleUserStatus={this.handleUserStatus} />
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, { refreshUser })(App)

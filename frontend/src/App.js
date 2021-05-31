import { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import Waiting from './components/Waiting'
import axios from 'axios'
import params from './params.json'
import socketIOClient from 'socket.io-client'
import { refreshUser, updateMyStatus } from './reducers/actions/userActions'
import { connect } from 'react-redux'

class App extends Component {
  state = {
    user: null,
    loadingUser: true,
  }

  socket = null
  refresher = null

  UpdateUserStatus = status => {
    let user = this.state.user
    user.status = status
    this.setState({ user })
  }

  handleUserStatus = status => {
    this.socket?.emit('USER_STATUS_UPDATE', status)
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.user !== prevProps.user.user) {
      if (this.props.user.user === null) {
        this.socket = null
      } else {
        console.log()
        const { access_token, token_type } = localStorage
        if (this.socket === null) {
          this.socket = socketIOClient(params.baseUrl, {
            withCredentials: true,
            extraHeaders: { authorization: token_type + ' ' + access_token },
          })
          // this.socket.on('BROADCAST_MY_STATUS', data => console.log(data))
          this.socket.on('USER_STATUS_UPDATED', status => {
            this.props.updateMyStatus(status)
          })
        }
      }
    }
  }

  componentDidMount() {
    axios.defaults.baseURL = params.baseUrl
    this.props.refreshUser()
    this.refresher = setInterval(this.props.refreshUser, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.refresher)
    this.socket = null
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

export default connect(mapStateToProps, { refreshUser, updateMyStatus })(App)

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
    this.setState({ loadingUser: false })
  }

  componentDidMount() {
    axios.defaults.baseURL = params.baseUrl
    this.refreshUser()
  }

  render() {
    if (this.state.loadingUser) return <Waiting />

    return (
      <Switch>
        <Route path='/auth'>
          <Auth user={this.state.user} />
        </Route>
        <Route>
          <Dashboard user={this.state.user} />
        </Route>
      </Switch>
    )
  }
}

export default App

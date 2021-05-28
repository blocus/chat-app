import { Route, Switch } from 'react-router-dom'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'

function App() {
  return (
    <Switch>
      <Route path='/auth'>
        <Auth />
      </Route>

      <Route>
        <Dashboard />
      </Route>
    </Switch>
  )
}

export default App

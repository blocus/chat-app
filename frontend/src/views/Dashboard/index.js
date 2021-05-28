import Sidebar from '../../components/Sidebar'
import Chat from './Chat'
import { Switch, Route } from 'react-router-dom'
function CommingSoon() {
  return <h1>Comming Soon</h1>
}

function Dashboard(props) {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path='/' exact>
          <CommingSoon />
        </Route>
        <Route path='/chat'>
          <Chat />
        </Route>
      </Switch>
    </>
  )
}

export default Dashboard

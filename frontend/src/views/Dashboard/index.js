import Sidebar from '../../components/Sidebar'
import Chat from './Chat'
import { Switch, Route } from 'react-router-dom'
import CommingSoon from '../../components/CommingSoon'

function Dashboard(props) {
  return (
    <>
      <Sidebar />
      <div id='wrapper'>
        <Switch>
          <Route path='/' exact>
            <CommingSoon />
          </Route>
          <Route path='/files'>
            <CommingSoon />
          </Route>
          <Route path='/tasks'>
            <CommingSoon />
          </Route>
          <Route path='/events'>
            <CommingSoon />
          </Route>
          <Route path='/stats'>
            <CommingSoon />
          </Route>
          <Route path='/video-call'>
            <CommingSoon />
          </Route>
          <Route path='/profile'>
            <CommingSoon />
          </Route>
          <Route path='/settings'>
            <CommingSoon />
          </Route>
          <Route path='/chat'>
            <Chat />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Dashboard

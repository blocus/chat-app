import Sidebar from '../../components/Sidebar'
import Chat from './Chat'
import { Switch, Route } from 'react-router-dom'
import CommingSoon from '../../components/CommingSoon'
import LandingPage from '../LandingPage'
import { connect } from 'react-redux'

function Dashboard(props) {
  if (!props.user) return <LandingPage />
  return (
    <>
      <Sidebar />
      <div id='wrapper'>
        <Switch>
          <Route path='/' exact>
            <CommingSoon title='Home' />
          </Route>
          <Route path='/files'>
            <CommingSoon title='Files' />
          </Route>
          <Route path='/tasks'>
            <CommingSoon title='Tasks' />
          </Route>
          <Route path='/events'>
            <CommingSoon title='Events' />
          </Route>
          <Route path='/stats'>
            <CommingSoon title='Stats' />
          </Route>
          <Route path='/video-call'>
            <CommingSoon title='VideoCall' />
          </Route>
          <Route path='/profile'>
            <CommingSoon title='Profile' />
          </Route>
          <Route path='/settings'>
            <CommingSoon title='Settings' />
          </Route>
          <Route path='/chat'>
            <Chat handleStatus={props.handleUserStatus} user={props.user} />
          </Route>
        </Switch>
      </div>
    </>
  )
}
const mapStateToProps = state => ({ user: state.user.user })

export default connect(mapStateToProps, {})(Dashboard)

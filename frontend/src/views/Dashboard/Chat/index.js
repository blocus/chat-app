import { useEffect } from 'react'
import ChatArea from './ChatArea'
import Navigation from './Navigation'
import { getMyConversations } from '../../../reducers/actions/conversationActions'
import { connect } from 'react-redux'
// const sortConvs = () => -1
import { Route, Switch } from 'react-router-dom'

function Chat(props) {
  useEffect(() => props.getMyConversations(), [props])
  return (
    <>
      <Navigation handleStatus={props.handleStatus} />
      <Switch>
        <Route path='/chat/:convId'>
          <ChatArea />
        </Route>
      </Switch>
    </>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { getMyConversations })(Chat)

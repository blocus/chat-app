import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function LastUnseen({ conversations }) {
  let toRedirect = conversations.filter(item => item.seen).sort((a, b) => b.date - a.date)[0]
  if (toRedirect) return <Redirect to={`/chat/${toRedirect.id}`} />
  return <></>
}

const mapStateToProps = state => ({
  conversations: state.conversation.conversations,
})

export default connect(mapStateToProps, {})(LastUnseen)

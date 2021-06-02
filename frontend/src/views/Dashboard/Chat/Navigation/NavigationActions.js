import axios from 'axios'
import { connect } from 'react-redux'

function NavigationActions(props) {
  const handleConversation = data => {}
  const createConversation = () => {
    let userId = '60b30ca5ad0e8715d9a8645b'

    axios.post(`/conversation/${userId}`).then(res => {
      handleConversation(res.data)
    })
  }

  return (
    <div className='chat-actions-bar'>
      <span className='sub-title'>Last chats</span>
      <div className='chat-actions'>
        <button className='btn is-primary-light' onClick={createConversation}>
          <i className='fas fa-plus'></i>
        </button>
        <button className='btn is-transparent'>
          <i className='fas fa-ellipsis-v'></i>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({ user: state.user.user, members: state.members.members })

export default connect(mapStateToProps, {})(NavigationActions)

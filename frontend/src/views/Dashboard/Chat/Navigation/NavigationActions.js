import axios from 'axios'
import { connect } from 'react-redux'

function NavigationActions(props) {
  const handleConversation = data => {
    console.log(data)
    // const conversations = this.state.conversations.slice()
    // conversations.push(data)
    // conversations.sort(sortConvs)
    // this.setState({ conversations })
  }
  const createConversation = () => {
    let userId
    userId = '60b30ca5ad0e8715d9a8645b'
    userId = '60b4de76b8497a8f492a21f4'
    userId = '60b4de7db8497a8f492a21f5'
    userId = '60b4de87b8497a8f492a21f6'
    userId = '60b4de8eb8497a8f492a21f7'

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

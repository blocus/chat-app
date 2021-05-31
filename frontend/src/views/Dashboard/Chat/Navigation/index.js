import { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ConversationList from './ConversationList'
const status = {
  C: { key: 'C', label: 'Connected', class: 'active' },
  B: { key: 'B', label: 'Busy', class: 'busy' },
  D: { key: 'D', label: 'Disconected', class: 'inactive' },
}

function StatusChanger({ user, handleStatus }) {
  const currentStatus = Object.keys(status).includes(user.status) ? user.status : 'C'

  return (
    <div className={`select ${status[currentStatus].class}`}>
      <button>{status[currentStatus].label}</button>
      <div>
        {Object.values(status).map((e, k) => (
          <button key={k} onClick={() => handleStatus(e.key)}>
            {e.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Navigation(props) {
  const { user, handleStatus, conversations, conversationsLoading, handleConversation } = props

  const currentStatus = Object.keys(status).includes(user.status) ? user.status : 'C'
  const createConversation = () => {
    let userId
    userId = '60b30ca5ad0e8715d9a8645b'
    userId = '60b4de76b8497a8f492a21f4'
    userId = '60b4de7db8497a8f492a21f5'
    userId = '60b4de87b8497a8f492a21f6'
    userId = '60b4de8eb8497a8f492a21f7'

    axios.post(`/conversation/${userId}`).then(res => handleConversation(res.data))
  }
  const [toogled, setToogled] = useState(false)
  const toogle = () => setToogled(!toogled)
  return (
    <nav className={toogled ? 'collapsed' : ''}>
      <header className='can-toogle'>
        <button className='btn toogler' onClick={toogle}>
          <i className='fas fa-chevron-left'></i>
        </button>
        <span className='title'>Chat</span>
      </header>
      <div className='profile-preview'>
        <button className='settings'>
          <i className='fas fa-cog'></i>
        </button>
        <div className={`image-profile ${status[currentStatus].class}`}>
          <img src={user.avatar} alt='avatar'></img>
        </div>
        <span className='title'>{user.fullname}</span>
        <StatusChanger user={user} handleStatus={handleStatus} />
        <input type='text' placeholder='search' className='search'></input>

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

        <ConversationList list={conversations} loading={conversationsLoading} />
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({ user: state.user.user, members: state.members.members })

export default connect(mapStateToProps, {})(Navigation)

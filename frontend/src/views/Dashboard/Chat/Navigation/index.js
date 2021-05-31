import { useState } from 'react'
import { formatDate } from '../../../../helpers'
import Loading from '../../../../components/Loading'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
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

function ConversationList(props) {
  if (props.conversationsLoading)
    return (
      <div className='list-chat is-waiting'>
        <Loading />
      </div>
    )

  if (props.conversations.length === 0)
    return (
      <div className='list-chat is-waiting'>
        <span className='text-muted'>You have no conversations</span>
      </div>
    )
  return (
    <div className='list-chat'>
      {props.conversations
        .sort((a, b) => b.date - a.date)
        .map((item, key) => {
          const currentStatus = Object.keys(status).includes(item.status) ? item.status : 'C'
          return (
            <NavLink className='list-chat-item' key={key} to={`/chat/${item.id}`}>
              <div className={`avatar ${status[currentStatus].class}`}>
                <img src={item.avatar} alt='avatar'></img>
              </div>
              <div>
                <span className='name'>{item.name}</span>
                {item.seen ? (
                  <span className='preview'>
                    <b>{item.preview}</b>
                  </span>
                ) : (
                  <span className='preview'>{item.preview}</span>
                )}
              </div>
              <span className='date'>{formatDate(item.date)}</span>
            </NavLink>
          )
        })}
    </div>
  )
}

function Navigation({
  user,
  handleStatus,
  conversations,
  conversationsLoading,
  handleConversation,
}) {
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
        <ConversationList
          conversations={conversations}
          conversationsLoading={conversationsLoading}
        />
      </div>
    </nav>
  )
}

export default Navigation

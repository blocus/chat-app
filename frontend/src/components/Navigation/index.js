import { useState } from 'react'
import { genRandomDate, formatDate, genRandomString } from '../../helpers'
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

function Navigation({ user, handleStatus }) {
  const currentStatus = Object.keys(status).includes(user.status) ? user.status : 'C'

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
            <button className='btn is-primary-light'>
              <i className='fas fa-plus'></i>
            </button>
            <button className='btn is-transparent'>
              <i className='fas fa-ellipsis-v'></i>
            </button>
          </div>
        </div>
        <div className='list-chat'>
          {Array.from({ length: 20 })
            .map((_, k) => ({
              avatar: 'https://picsum.photos/50',
              date: genRandomDate(),
              name: `User ${k + 1}`,
              preview: genRandomString(),
            }))
            .sort((a, b) => b.date - a.date)
            .map((item, key) => (
              <div key={key} className={`list-chat-item${key === 0 ? ' active' : ''}`}>
                <div className='avatar'>
                  <img src={item.avatar} alt='avatar'></img>
                </div>
                <div>
                  <span className='name'>{item.name}</span>
                  <span className='preview'>{item.preview}</span>
                </div>
                <span className='date'>{formatDate(item.date)}</span>
              </div>
            ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

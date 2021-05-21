import moment from 'moment'
import { useState } from 'react'

const formatDate = date => {
  return moment(date).fromNow()
}
const lorem =
  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla ex eu est malesuada, eu malesuada nisi auctor. Curabitur eget est nulla. Quisque facilisis nisl eu gravida congue. Sed risus ipsum, ultricies eu tincidunt eget, tempus nec magna. Sed turpis justo, sagittis nec feugiat vitae, efficitur non ligula. Quisque ac dui fermentum, molestie tellus a, porttitor sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas viverra, felis et aliquet fermentum, augue felis congue felis, id blandit nisl nisl at sapien. Duis malesuada vel ex in bibendum. Mauris placerat risus lacus, non dignissim urna semper nec. In ac faucibus eros. Curabitur mattis, urna vel suscipit rutrum, purus nibh euismod lectus, id feugiat nulla ligula in tortor. Nunc sagittis luctus sagittis.'.split(
    ' '
  )

const genRandomString = () => lorem.slice(0, Math.floor(Math.random() * 8) + 2).join(' ')

const genRandomDate = () => {
  const Y = 2021
  const M = Math.floor(Math.random() * 2) + 3
  const D = Math.floor(Math.random() * 28)
  const h = Math.floor(Math.random() * 24)
  const i = Math.floor(Math.random() * 60)
  return new Date(Y, M, D, h, i)
}

function Navigation() {
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
        <div className='image-profile active'>
          <img src='https://picsum.photos/300' alt='avatar'></img>
        </div>
        <span className='title'>Ahmed Meftah</span>
        <div className='select active'>
          <button>Connected</button>
          <div>
            <button>Connected</button>
            <button>Busy</button>
            <button>Disconected</button>
          </div>
        </div>
        {/*
          <div className='active inactive busy'>
        */}
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

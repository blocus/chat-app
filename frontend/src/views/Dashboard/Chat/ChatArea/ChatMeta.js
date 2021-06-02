import { useState } from 'react'
import { formatFullDate } from '../../../../helpers'

function ChatMeta(props) {
  const conversation = props.conversation ?? {}
  const { avatar, name, type, members } = conversation
  console.log(props.conversation.members)
  console.log(props.conversation.type)
  const [toogled, setToogled] = useState(false)
  const toogle = () => setToogled(!toogled)
  const number = members?.length ?? 0

  const files = [
    { class: 'file', icon: 'fas fa-file', title: 'Documents', number: 23, size: '127MB' },
    { class: 'image', icon: 'fas fa-image', title: 'Photos', number: 5, size: '127MB' },
    { class: 'music', icon: 'fas fa-music', title: 'Audio', number: 23, size: '127MB' },
    { class: 'film', icon: 'fas fa-film', title: 'Movies', number: 23, size: '127MB' },
    { class: 'archive', icon: 'fas fa-archive', title: 'Archives', number: 23, size: '127MB' },
    { class: 'copy', icon: 'fas fa-copy', title: 'Other', number: 23, size: '127MB' },
    { class: 'link', icon: 'fas fa-link', title: 'Links', number: 23, size: '' },
  ]
  return (
    <nav className={'right' + (toogled ? ' collapsed' : '')}>
      <header className='can-toogle'>
        <button className='btn toogler' onClick={toogle}>
          <i className='fas fa-chevron-right'></i>
        </button>
        <span className='title'>Shared files</span>
      </header>
      <div className='info'>
        <img src={avatar} alt='group-avatar'></img>
        <div className='info-title'>{name}</div>
        {type === 'G' ? <div className='info-description'>{number} Members</div> : <></>}
        <div className='info-description text-muted'>
          <small>Since {formatFullDate(props.conversation.createdAt)}</small>
        </div>
      </div>

      <div className='items'>
        {files.map((e, k) => {
          if (e.number > 0)
            return (
              <div key={k} className={`item ${e.class}`}>
                <div className='icon'>
                  <i className={e.icon}></i>
                </div>
                <div className='item-data'>
                  <span className='item-title'>{e.title}</span>
                  <span className='item-description'>
                    {e.number} file{e.number > 1 ? 's' : ''} {e.size ? ',' : ''} {e.size}
                  </span>
                </div>
              </div>
            )
          return <></>
        })}
      </div>
    </nav>
  )
}

export default ChatMeta

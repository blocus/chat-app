import { genRandomDate, formatDate, genRandomString } from '../../../../helpers'
import avatar1 from '../../../../assets/images/avatar1.svg'
import avatar2 from '../../../../assets/images/avatar2.svg'
import avatar3 from '../../../../assets/images/avatar3.svg'
import avatar4 from '../../../../assets/images/avatar4.svg'
import { createRef } from 'react'
import axios from 'axios'
const senders = [
  { username: 'ahmedmeftah', name: 'Ahmed Meftah', avatar: avatar1, isMe: true },
  { username: 'aaaaaaaaa', name: 'Aaaaaaaa Aaaaaaaa', avatar: avatar2, isMe: false },
  { username: 'bbbbbbbbb', name: 'bbbbbbbb bbbbbbbbb', avatar: avatar3, isMe: false },
  { username: 'cccccccccc', name: 'ccccccccccc cccccccccccc', avatar: avatar4, isMe: false },
]

const messages = Array.from({ length: 30 })
  .map(() => ({
    sender: senders[Math.floor(Math.random() * senders.length)],
    message: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
      text: genRandomString(),
      attachement:
        Math.random() < 0.1
          ? { color: '#04ac9b', icon: 'fas fa-file', name: 'Report 05-2021.pdf', size: '3Mb' }
          : null,
    })),
    date: genRandomDate(),
  }))
  .sort((a, b) => b.date - a.date)

function Message(props) {
  const Attachement = ({ attachement }) => {
    if (attachement)
      return (
        <div className='message-content-attachement'>
          <span>
            <i style={{ color: attachement.color }} className={attachement.icon} />
            <span>{attachement.name}</span>
          </span>
          <button>
            <i className='fas fa-download'></i>
          </button>
        </div>
      )
    return <></>
  }
  return (
    <div className={`message-wrapper${props.sender.isMe ? ' me' : ''}`}>
      <div className='message-info'>
        {props.sender.name} {formatDate(props.date)}
      </div>
      <div className='message-data'>
        <img className='message-avatar' src={props.sender.avatar} alt={props.sender.name} />

        <div className='message-content'>
          {props.message.map((msg, key) => (
            <div key={key} className='message-content-text'>
              {msg.text}
              <Attachement {...msg} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UploadProgress(props) {
  let value
  if (props.value === undefined) return <></>
  if (props.value > 100) value = 100
  else if (props.value < 0) value = 0
  else value = props.value
  return (
    <div className='progress-container'>
      <span className='progress-value'>{value}</span>
      <progress value={value} max='100'></progress>
      <button className='is-dark'>
        <i className='fas fa-pause'></i>
      </button>
      <button className='is-danger'>
        <i className='fas fa-times'></i>
      </button>
      <button>
        <i className='fas fa-times'></i>
      </button>
    </div>
  )
}

function IsWriting(props) {
  return (
    <div className='is-writing'>
      <div className='is-writing-icon'>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span>Some one is typing</span>
    </div>
  )
}

function SendMessage({ roomId, attachements }) {
  const textRef = createRef()

  const send = () => {
    const text = textRef.current.value
    const data = { attachements, text }
    axios
      .post(`/message/${roomId}`, data)
      .then(res => {
        textRef.current.value = ''
        console.log(res.data)
      })
      .catch(console.log)
  }
  return (
    <div className='new-message'>
      <textarea ref={textRef} placeholder='Write your message ...'></textarea>
      <div className='new-message-actions'>
        <button>
          <i className='fas fa-laugh'></i>
        </button>
        <button>
          <i className='fas fa-paperclip'></i>
        </button>
        <button onClick={send} className='btn is-primary'>
          <i className='fas fa-paper-plane'></i>
        </button>
      </div>
    </div>
  )
}

function ChatMessages() {
  const attachements = []
  const roomId = '60b4e79a8e97f8139866d349'
  return (
    <main>
      <header>
        <span className='main-header-title'>Chat title</span>
        <div className='main-header-actions'>
          <button className='active'>Messages</button>
          <button>Participants</button>
        </div>
      </header>
      <div className='wrapper'>
        <UploadProgress value='50' />
        <IsWriting />
        {messages.map((e, k) => (
          <Message {...e} key={k} />
        ))}
      </div>

      <SendMessage roomId={roomId} attachements={attachements} />
    </main>
  )
}

export default ChatMessages

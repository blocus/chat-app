import { Component, createRef } from 'react'
import axios from 'axios'
import Message from './Messages'

function UploadProgress(props) {
  if (!props.uploading) return <></>
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

function IsWriting({ writer }) {
  if (writer)
    return (
      <div className='is-writing'>
        <div className='is-writing-icon'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span>{writer} is typing</span>
      </div>
    )
  return <></>
}

function SendMessage({ uploading, upload, send, imWriting }) {
  const textRef = createRef()

  const Handlesend = () => {
    const text = textRef.current.value
    const data = { text }
    send(data)
    textRef.current.value = ''
  }
  return (
    <div className='new-message'>
      <textarea ref={textRef} onChange={imWriting} placeholder='Write your message ...'></textarea>
      <div className='new-message-actions'>
        <button>
          <i className='fas fa-laugh'></i>
        </button>

        {!uploading && (
          <button onClick={upload}>
            <i className='fas fa-paperclip'></i>
          </button>
        )}

        <button onClick={Handlesend} className='btn is-primary'>
          <i className='fas fa-paper-plane'></i>
        </button>
      </div>
    </div>
  )
}

class ChatMessages extends Component {
  state = {
    uploading: false,
    value: null,
    file: null,
  }

  fileUploader = createRef()

  fileUploadInputChange = e => this.setState({ file: e.target.files[0] })

  selectFile = () => {
    this.setState({ file: null, value: 0 }, () => {
      this.fileUploader.current.click()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.file !== this.state.file && this.state.file && !this.state.uploading) {
      this.upload()
    }
  }

  upload = () => {
    this.setState({ uploading: true, value: 0 }, () => {
      const formData = new FormData()
      formData.append('file', this.state.file)
      axios
        .post('/file/upload', formData, {
          onUploadProgress: progress => {
            this.setState({ value: Math.round((progress.loaded / progress.total) * 100) })
          },
        })
        .then(res => {
          this.setState({ uploading: false, value: null, file: null }, () =>
            this.sendMessage(res.data)
          )
        })
        .catch(() => {
          this.setState({ uploading: false, value: null, file: null })
        })
    })
  }

  sendMessage = data => {
    this.props.socket.emit('USER_SEND_MESSAGE', {
      convId: this.props.convId,
      attachements: [data.id],
    })
  }

  render() {
    return (
      <main>
        <header>
          <span className='main-header-title'>{this.props.conversation.name}</span>
          <div className='main-header-actions'>
            <button className='active'>Messages</button>
            <button>Participants</button>
          </div>
        </header>
        <div className='wrapper'>
          <UploadProgress uploading={this.state.uploading} value={this.state.value} />
          <IsWriting writer={this.props.writer} />
          {this.props.messages.map((e, k) => (
            <Message {...e} key={k} />
          ))}
        </div>

        <SendMessage
          imWriting={this.props.imWriting}
          roomId={this.props.conversation.id}
          uploading={this.state.uploading}
          upload={this.selectFile}
          send={this.props.send}
          attachements={this.state.uploaded}
        />
        <input type='file' ref={this.fileUploader} onChange={this.fileUploadInputChange} hidden />
      </main>
    )
  }
}

export default ChatMessages

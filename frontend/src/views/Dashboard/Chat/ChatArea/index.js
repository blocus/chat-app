import ChatMessages from './ChatMessages'
import ChatMeta from './ChatMeta'
import { Redirect } from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import params from '../../../../params.json'

class ChatArea extends Component {
  state = {
    data: { conversation: {}, messages: [] },
    convId: null,
    redirect: false,
    writer: null,
  }
  socket = null

  sendMessage = data => {
    if (this.socket) this.socket.emit('USER_SEND_MESSAGE', { convId: this.state.convId, ...data })
  }

  componentDidMount() {
    this.refreshConvId()
    const { access_token, token_type } = localStorage
    if (this.socket === null) {
      this.socket = socketIOClient(params.baseUrl, {
        withCredentials: true,
        extraHeaders: { authorization: token_type + ' ' + access_token },
      })
      this.socket.on('RECEIVE_MESSAGE', this.handleReceived)
      this.socket.on('USER_SEND_MESSAGE_FAIL', this.handleReceived)
    }
  }

  handleReceived = message => {
    const data = JSON.parse(JSON.stringify(this.state.data))
    data.messages.push(message)
    data.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    this.setState({ data })
    console.log(data)
  }

  componentDidUpdate() {
    this.refreshConvId()
  }

  refreshConvId = () => {
    let convId = this.props?.match?.params?.convId
    if (!convId) return this.setState({ redirect: true })
    if (this.state.convId !== convId) return this.setState({ convId }, this.refresh)
  }

  refresh = () => {
    const { convId } = this.state
    axios
      .get('/conversation/' + convId)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({ redirect: true }))
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <>
        <ChatMessages
          convId={this.state.convId}
          socket={this.socket}
          send={this.sendMessage}
          writer={this.state.writer}
          {...this.state.data}
        />
        <ChatMeta {...this.state.data} />
      </>
    )
  }
}

export default ChatArea

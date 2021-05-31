import axios from 'axios'
import { Component } from 'react'
import ChatArea from './ChatArea'
import ChatMeta from './ChatMeta'
import Navigation from './Navigation'

const sortConvs = () => -1

class Chat extends Component {
  state = {
    conversations: [],
    conversationsLoading: true,
  }

  componentDidMount() {
    this.refreshConversations()
  }

  handleConversation = data => {
    const conversations = this.state.conversations.slice()
    conversations.push(data)
    conversations.sort(sortConvs)
    this.setState({ conversations })
  }

  refreshConversations = () => {
    axios
      .get('/conversation')
      .then(res => {
        this.setState({ conversationsLoading: false, conversations: res.data })
      })
      .catch(() => {
        this.setState({ conversationsLoading: false })
      })
  }

  render() {
    return (
      <>
        <Navigation
          handleConversation={this.handleConversation}
          conversations={this.state.conversations}
          conversationsLoading={this.state.conversationsLoading}
          handleStatus={this.props.handleStatus}
        />
        <ChatArea />
        <ChatMeta />
      </>
    )
  }
}

export default Chat

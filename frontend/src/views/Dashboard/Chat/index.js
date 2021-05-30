import axios from 'axios'
import { Component } from 'react'
import ChatArea from '../../../components/ChatArea'
import ChatMeta from '../../../components/ChatMeta'
import Navigation from '../../../components/Navigation'

const sortConvs = () => -1

class Chat extends Component {
  state = {
    conversations: [],
    conversationsLoading: true,
  }

  // conversationsInterval = null

  componentDidMount() {
    this.refreshConversations()
    // this.conversationsInterval = setInterval(this.refreshConversations, 5000)
  }

  componentWillUnmount() {
    // clearInterval(this.conversationsInterval)
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
          user={this.props.user}
        />
        <ChatArea />
        <ChatMeta />
      </>
    )
  }
}

export default Chat

import ChatArea from '../../../components/ChatArea'
import ChatMeta from '../../../components/ChatMeta'
import Navigation from '../../../components/Navigation'

function Chat({ user, handleStatus }) {
  return (
    <>
      <Navigation handleStatus={handleStatus} user={user} />
      <ChatArea />
      <ChatMeta />
    </>
  )
}

export default Chat

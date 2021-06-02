import ChatMessages from './ChatMessages'
// import { genRandomDate, formatDate, genRandomString } from '../../../../helpers'
import ChatMeta from './ChatMeta'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

// import avatar1 from '../../../../assets/images/avatar1.svg'
// import avatar2 from '../../../../assets/images/avatar2.svg'
// import avatar3 from '../../../../assets/images/avatar3.svg'
// import avatar4 from '../../../../assets/images/avatar4.svg'

// const senders = [
//   { username: 'ahmedmeftah', name: 'Ahmed Meftah', avatar: avatar1, isMe: true },
//   { username: 'aaaaaaaaa', name: 'Aaaaaaaa Aaaaaaaa', avatar: avatar2, isMe: false },
//   { username: 'bbbbbbbbb', name: 'bbbbbbbb bbbbbbbbb', avatar: avatar3, isMe: false },
//   { username: 'cccccccccc', name: 'ccccccccccc cccccccccccc', avatar: avatar4, isMe: false },
// ]

// const messages = Array.from({ length: 30 })
//   .map(() => ({
//     sender: senders[Math.floor(Math.random() * senders.length)],
//     message: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
//       text: genRandomString(),
//       attachement:
//         Math.random() < 0.1
//           ? { color: '#04ac9b', icon: 'fas fa-file', name: 'Report 05-2021.pdf', size: '3Mb' }
//           : null,
//     })),
//     date: genRandomDate(),
//   }))
//   .sort((a, b) => b.date - a.date)

function ChatArea(props) {
  const { convId } = useParams()
  const [data, setData] = useState({
    conversation: {},
    messages: [],
  })

  const refreshData = () => {
    axios
      .get('/message/' + convId)
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(refreshData, [convId])

  return (
    <>
      <ChatMessages {...data} />
      <ChatMeta {...data} />
    </>
  )
}

export default ChatArea

import { formatDate } from '../../../../helpers'
import Loading from '../../../../components/Loading'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { status } from './constants'
import { useEffect, useState } from 'react'
var timer = null

function ConversationList(props) {
  const [, setRefresher] = useState(0)
  useEffect(() => {
    timer = setInterval(() => setRefresher(Math.floor(Math.random() * 10000)), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  if (props.loading)
    return (
      <div className='list-chat is-waiting'>
        <Loading />
      </div>
    )

  if (props.list.length === 0)
    return (
      <div className='list-chat is-waiting'>
        <span className='text-muted'>You have no conversations</span>
      </div>
    )
  return (
    <div className='list-chat'>
      {props.list
        .sort((a, b) => b.date - a.date)
        .map((item, key) => {
          let currentStatus = ''
          if (item.members?.length === 1 && item.type === 'P')
            currentStatus = props.members[item.members[0]]?.status ?? 'D'
          return (
            <NavLink className='list-chat-item' key={key} to={`/chat/${item.id}`}>
              <div className={`avatar ${status[currentStatus]?.class}`}>
                <img src={item.avatar} alt='avatar'></img>
              </div>
              <div>
                {item.seen ? (
                  <>
                    <span className='name'>{item.name}</span>
                    <span className='preview'>{item.preview}</span>
                  </>
                ) : (
                  <>
                    <span className='name'>
                      <b>{item.name}</b>
                    </span>
                    <span className='preview'>
                      <b>{item.preview}</b>
                    </span>
                  </>
                )}
              </div>
              <span className='date'>{formatDate(item.date)}</span>
            </NavLink>
          )
        })}
    </div>
  )
}

const mapStateToProps = state => ({
  list: state.conversation.conversations,
  members: state.members.members,
  loading: state.conversation.loading,
})

export default connect(mapStateToProps, {})(ConversationList)

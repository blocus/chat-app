import { formatFullDate } from '../../../../helpers'
import { connect } from 'react-redux'

function Messages(props) {
  const me = props.user.id
  const isMe = props.sender === me
  const date = props.createdAt
  const sender = props.members[props.sender]

  const { fullname, avatar } = sender

  const Attachement = ({ attachement }) => {
    // TODO
    // if (attachement)
    //   return (
    //     <div className='message-content-attachement'>
    //       <span>
    //         <i style={{ color: attachement.color }} className={attachement.icon} />
    //         <span>{attachement.name}</span>
    //       </span>
    //       <button>
    //         <i className='fas fa-download'></i>
    //       </button>
    //     </div>
    //   )
    return <></>
  }

  return (
    <div className={`message-wrapper${isMe ? ' me' : ''}`}>
      <div className='message-info'>
        {fullname} {formatFullDate(date)}
      </div>
      <div className='message-data'>
        <img className='message-avatar' src={avatar} alt={fullname} />

        <div className='message-content'>
          <div className='message-content-text'>
            {props.text}
            {props.attachements?.map((e, k) => (
              <Attachement key={k} {...e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  members: state.members.members,
  user: state.user.user,
})

export default connect(mapStateToProps, {})(Messages)

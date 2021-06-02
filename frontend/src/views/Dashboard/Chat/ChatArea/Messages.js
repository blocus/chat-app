import { formatFullDate } from '../../../../helpers'
import { connect } from 'react-redux'
import params from '../../../../params.json'
function Messages(props) {
  const me = props.user.id
  const isMe = props.sender === me
  const date = props.createdAt
  const sender = props.members[props.sender]
  const { fullname, avatar } = sender ?? {}

  const Attachement = props => {
    if (props.id)
      return (
        <div className='message-content-attachement'>
          <span>
            <i style={{ color: props.color }} className={props.icon} />
            <span>{props.name}</span>
          </span>
          <a target='_blank' rel='noreferrer' href={`${params.baseUrl}/file/${props.id}`}>
            <i className='fas fa-download'></i>
          </a>
        </div>
      )
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

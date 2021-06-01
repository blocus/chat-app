import { useState } from 'react'
import { connect } from 'react-redux'
import ConversationList from './ConversationList'
import NavigationActions from './NavigationActions'
import NavigationHeader from '../../../../components/NavigationHeader'
import StatusChanger from './StatusChanger'
import { status } from './constants'

function Navigation({ user, handleStatus }) {
  const currentStatus = Object.keys(status).includes(user.status) ? user.status : 'C'
  const [toogled, setToogled] = useState(false)

  return (
    <nav className={toogled ? 'collapsed' : ''}>
      <NavigationHeader
        click={() => setToogled(!toogled)}
        icon='fas fa-chevron-left'
        title='Chat'
      />

      <div className='profile-preview'>
        <button className='settings'>
          <i className='fas fa-cog'></i>
        </button>
        <div className={`image-profile ${status[currentStatus].class}`}>
          <img src={user.avatar} alt='avatar'></img>
        </div>
        <span className='title'>{user.fullname}</span>

        <StatusChanger handleStatus={handleStatus} />
        <input type='text' placeholder='search' className='search'></input>
        <NavigationActions />
        <ConversationList />
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({ user: state.user.user, members: state.members.members })

export default connect(mapStateToProps, {})(Navigation)

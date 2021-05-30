import logo from '../../assets/logo.svg'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { icon: 'far fa-calendar-check', link: '/tasks' },
  { icon: 'far fa-calendar', link: '/events' },
  { icon: 'fas fa-user-friends', link: '/chat' },
  { icon: 'fas fa-chart-bar', link: '/stats' },
  { icon: 'fas fa-video', link: '/video-call' },
  { icon: 'far fa-file', link: '/files' },
]

const userLinks = [
  { text: 'Profile', link: '/profile' },
  { text: 'Settings', link: '/settings' },
  { text: 'Logout', link: '/auth/logout' },
]

function Sidebar({ user }) {
  return (
    <aside>
      <div>
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' />
        </Link>
      </div>
      <div>
        {links.map((e, k) => (
          <NavLink key={k} to={e.link}>
            <i className={e.icon}></i>
          </NavLink>
        ))}
      </div>
      <div className='dropdown'>
        <button className='toogler logo'>
          <img src={user.avatar} alt='avatar'></img>
        </button>
        <div className='dropdown-menue'>
          {userLinks.map((e, k) => (
            <Link key={k} to={e.link}>
              {e.text}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

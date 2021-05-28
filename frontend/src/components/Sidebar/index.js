import logo from '../../assets/logo.svg'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { icon: 'far fa-clock', link: '/', exact: true },
  { icon: 'far fa-calendar-check', link: '/', exact: true },
  { icon: 'far fa-eye', link: '/', exact: true },
  { icon: 'fas fa-user-friends', link: '/chat', exact: false },
  { icon: 'fas fa-chart-bar', link: '/', exact: true },
  { icon: 'fas fa-video', link: '/', exact: true },
]

const userLinks = [
  { text: 'Profile', link: '/profile' },
  { text: 'Settings', link: '/settings' },
  { text: 'Logout', link: '/auth/logout' },
]

function Sidebar() {
  return (
    <aside>
      <div>
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' />
        </Link>
      </div>
      <div>
        {links.map((e, k) => (
          <NavLink key={k} to={e.link} exact={e.exact}>
            <i className={e.icon}></i>
          </NavLink>
        ))}
      </div>
      <div className='dropdown'>
        <button className='logo'>
          <img src='https://picsum.photos/50' alt='avatar'></img>
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

import logo from '../../assets/logo.svg'
function Sidebar() {
  return (
    <aside>
      <div>
        <button className='logo'>
          <img src={logo} alt='logo' />
        </button>
      </div>
      <div>
        <button>
          <i className='far fa-clock'></i>
        </button>
        <button>
          <i className='far fa-calendar-check'></i>
        </button>
        <button className='active'>
          <i className='far fa-eye'></i>
        </button>
        <button>
          <i className='fas fa-comment'></i>
        </button>
        <button>
          <i className='fas fa-chart-bar'></i>
        </button>
        <button>
          <i className='fas fa-video'></i>
        </button>
      </div>
      <div>
        <button className='logo'>
          <img src='https://picsum.photos/50' alt='avatar'></img>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

function NavigationHeader({ click, icon, title }) {
  return (
    <header className='can-toogle'>
      <button className='btn toogler' onClick={click}>
        <i className={icon}></i>
      </button>
      <span className='title'>{title}</span>
    </header>
  )
}

export default NavigationHeader

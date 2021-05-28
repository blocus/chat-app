function Register() {
  return (
    <div className='auth-container-card-body'>
      <input placeholder='Username' type='text' />
      <input placeholder='Email' type='email' />
      <input placeholder='Password' type='password' />
      <input placeholder='Confirm password' type='password' />
      <button className='btn is-primary w-100'>Send</button>
    </div>
  )
}
export default Register

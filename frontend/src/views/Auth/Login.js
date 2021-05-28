function Login() {
  return (
    <div className='auth-container-card-body'>
      <input placeholder='Username' type='text' />
      <input placeholder='Password' type='password' />
      <button className='btn is-primary w-100'>Send</button>
    </div>
  )
}
export default Login

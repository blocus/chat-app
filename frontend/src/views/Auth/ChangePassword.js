function ChangePassword() {
  return (
    <div className='auth-container-card-body'>
      <input placeholder='Password' type='password' />
      <input placeholder='Confirm password' type='password' />
      <button className='btn is-primary w-100'>Send</button>
    </div>
  )
}
export default ChangePassword

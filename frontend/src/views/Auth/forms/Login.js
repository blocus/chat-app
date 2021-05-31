import { useForm } from 'react-hook-form'
import Loading from '../../../components/Loading'
import { connect } from 'react-redux'
import { loginUser, resetFataError } from '../../../reducers/actions/userActions'

function Login({ user, loginUser, resetFataError }) {
  const fatalError = user.fatalLoginError
  const loginError = user.loginError
  const { register, handleSubmit } = useForm()

  const onSubmit = data => loginUser(data)

  if (fatalError) {
    return (
      <div className='auth-container-card-body'>
        <p className='text-center'>Sory we have a problem with our system. 😱</p>
        <p className='text-center'>Please try again later</p>
        <button className='btn is-primary' onClick={resetFataError}>
          Try again
        </button>
      </div>
    )
  }
  if (user.sendLogin)
    return (
      <div className='auth-container-card-body'>
        <p className='text-center'>
          <Loading />
        </p>
        <p className='text-center'>Please Wait 😊</p>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='auth-container-card-body'>
      {loginError && (
        <div className='alert alert-danger'>Please verify your username and your password</div>
      )}
      <input placeholder='Username' {...register('username', { required: true })} type='text' />
      <input placeholder='Password' {...register('password', { required: true })} type='password' />
      <button className='btn is-primary w-100'>Send</button>
    </form>
  )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, { loginUser, resetFataError })(Login)

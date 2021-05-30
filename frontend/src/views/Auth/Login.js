import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Loading from '../../components/Loading'

function Login({ handleLogin }) {
  const [fatalError, setFatalError] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    setWaiting(true)
    setLoginError(false)
    setFatalError(false)
    axios
      .post('/auth/login', data)
      .then(res => {
        setWaiting(false)
        handleLogin(res.data)
      })
      .catch(err => {
        setWaiting(false)
        console.log(err?.response?.status)
        if (err?.response?.status === 401) setLoginError(true)
        else setFatalError(true)
      })
  }

  if (fatalError) {
    return (
      <div className='auth-container-card-body'>
        <p className='text-center'>Sory we have a problem with our system. 😱</p>
        <p className='text-center'>Please try again later</p>
        <button className='btn is-primary' onClick={() => setFatalError(false)}>
          Try again
        </button>
      </div>
    )
  }
  if (waiting)
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
export default Login

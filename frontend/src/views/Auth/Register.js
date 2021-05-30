import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import Loading from '../../components/Loading'
function Register() {
  const [password, setPassword] = useState('')
  const [registred, setRegistred] = useState(false)
  const [fatalError, setFatalError] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [invalidUserName, setInvalidUserName] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handlePasswordChange = event => setPassword(event.target.value)

  const onSubmit = data => {
    setWaiting(true)
    console.log(data)
    axios
      .post('/auth/register', data)
      .then(() => {
        setRegistred(true)
        setWaiting(false)
      })
      .catch(err => {
        setWaiting(false)
        setInvalidUserName(false)
        setInvalidEmail(false)
        const data = err?.response?.data
        if (data && data.name && data.code === 11000) {
          const problemKeys = Object.keys(data?.keyPattern ?? {})[0]
          if (problemKeys === 'username') setInvalidUserName('This username is already used')
          else if (problemKeys === 'email') setInvalidEmail('This email is already used')
        } else setFatalError(true)
      })
  }
  if (registred)
    return (
      <div className='auth-container-card-body'>
        <p className='text-center'>Welcome to our family 😃</p>
        <p className='text-center'>
          Please check your email and confirm it to access to your dashboard
        </p>
        <p className='text-center'>We are waiting you 😊</p>
        <p className='text-center'>Probably i didn't have time to send the email</p>
        <p className='text-center'>Try to login</p>
      </div>
    )
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
      <div>
        <input
          placeholder='Username'
          {...register('username', { required: 'This field is required' })}
          type='text'
        />
        {errors.username && <span className='invalid-data'>{errors.username.message}</span>}
        {invalidUserName && <span className='invalid-data'>{invalidUserName}</span>}
      </div>
      <div>
        <input
          placeholder='Email'
          {...register('email', { required: 'This field is required' })}
          type='email'
        />
        {invalidEmail && <span className='invalid-data'>{invalidEmail}</span>}
        {errors.email && <span className='invalid-data'>{errors.email.message}</span>}
      </div>
      <div>
        <input
          defaultValue={password}
          placeholder='Password'
          {...register('password', {
            required: 'This field is required',
            minLength: { value: 8, message: 'This field should have more than 8 characters' },
          })}
          onChange={handlePasswordChange}
          type='password'
        />
        {errors.password && <span className='invalid-data'>{errors.password.message}</span>}
      </div>
      <div>
        <input
          placeholder='Confirm password'
          {...register('confirm_password', {
            required: 'This field is required',
            minLength: { value: 8, message: 'This field should have more than 8 characters' },
            validate: {
              minvalue: v =>
                v === password || 'Confirmation password should be the same as password',
            },
          })}
          type='password'
        />
        {errors.confirm_password && (
          <span className='invalid-data'>{errors.confirm_password.message}</span>
        )}
      </div>
      <button className='btn is-primary w-100'>Send</button>
    </form>
  )
}
export default Register

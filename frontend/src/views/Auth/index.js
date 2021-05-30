import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import ChangePassword from './ChangePassword'
import logo from '../../assets/logo.svg'

import { Route, Switch, Link, Redirect } from 'react-router-dom'

function CardHeader(props) {
  const title = props.title ?? 'Welcome to doveme.space'
  const subTitle = props.subTitle ?? 'Already a User ?'
  return (
    <div className='auth-container-card-header'>
      <img src={logo} alt='logo' />
      <h1>{title}</h1>
      <span className='text-muted'>{subTitle}</span>
    </div>
  )
}

function CardFooter({ links }) {
  return (
    <div className='auth-container-card-footer'>
      {links.map((e, k) => (
        <Link key={k} to={e.link}>
          {e.text}
        </Link>
      ))}
    </div>
  )
}

function Logout(props) {
  return <Redirect to='/auth/login' />
}

function Auth(props) {
  return (
    <div className='auth-container'>
      <div className='auth-container-card'>
        <Switch>
          <Route path='/auth/login' exact>
            <CardHeader subTitle='Already a User ? Just login 😘' />
            <Login />
            <CardFooter
              links={[
                { text: 'Register', link: '/auth/register' },
                { text: 'Forgot password', link: '/auth/forgot-password' },
              ]}
            />
          </Route>
          <Route path='/auth/register' exact>
            <CardHeader subTitle='New ? Welcome. Create an account and join us 🤗' />
            <Register />
            <CardFooter
              links={[
                { text: 'Login', link: '/auth/login' },
                { text: 'Forgot password', link: '/auth/forgot-password' },
              ]}
            />
          </Route>
          <Route path='/auth/forgot-password' exact>
            <CardHeader subTitle='We will send you an e-mail and you know the story 😩' />
            <ForgotPassword />
            <CardFooter
              links={[
                { text: 'Login', link: '/auth/login' },
                { text: 'Register', link: '/auth/register' },
              ]}
            />
          </Route>
          <Route path='/auth/change-password/:token' exact>
            <CardHeader subTitle='We hope you will not forget it again 🙏' />
            <ChangePassword />
            <CardFooter
              links={[
                { text: 'Login', link: '/auth/login' },
                { text: 'Register', link: '/auth/register' },
              ]}
            />
          </Route>
          <Route path='/auth/logout' exact>
            <Logout />
          </Route>
          <Route>
            <Redirect to='/auth/login' />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Auth

import Login from './forms/Login'
import Register from './forms/Register'
import ForgotPassword from './forms/ForgotPassword'
import ChangePassword from './forms/ChangePassword'
import logo from '../../assets/images/logo.svg'
import { connect } from 'react-redux'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { logoutUser } from '../../reducers/actions/userActions'

const cardData = {
  loginCard: {
    subTitle: 'Already a User ? Just login 😘',
    links: [
      { text: 'Register', link: '/auth/register' },
      { text: 'Forgot password', link: '/auth/forgot-password' },
    ],
  },

  registerCard: {
    subTitle: 'New ? Welcome. Create an account and join us 🤗',
    links: [
      { text: 'Login', link: '/auth/login' },
      { text: 'Forgot password', link: '/auth/forgot-password' },
    ],
  },

  forgotCard: {
    subTitle: 'We will send you an e-mail and you know the story 😩',
    links: [
      { text: 'Login', link: '/auth/login' },
      { text: 'Register', link: '/auth/register' },
    ],
  },

  resetCard: {
    subTitle: 'We hope you will not forget it again 🙏',
    links: [
      { text: 'Login', link: '/auth/login' },
      { text: 'Register', link: '/auth/register' },
    ],
  },
}

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

function Logout({ logoutUser }) {
  logoutUser()
  return <></>
}

function AuthCard(props) {
  return (
    <div className='auth-container'>
      <div className='auth-container-card'>
        <CardHeader subTitle={props.subTitle} />
        {props.children}
        <CardFooter links={props.links} />
      </div>
    </div>
  )
}

function Auth({ logoutUser, user }) {
  if (user)
    return (
      <Switch>
        <Route path='/auth/logout' exact>
          <Logout logoutUser={logoutUser} />
        </Route>
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    )

  return (
    <Switch>
      <Route path='/auth/login' exact>
        <AuthCard {...cardData.loginCard}>
          <Login />
        </AuthCard>
      </Route>

      <Route path='/auth/register' exact>
        <AuthCard {...cardData.registerCard}>
          <Register />
        </AuthCard>
      </Route>

      <Route path='/auth/forgot-password' exact>
        <AuthCard {...cardData.forgotCard}>
          <ForgotPassword />
        </AuthCard>
      </Route>

      <Route path='/auth/change-password/:token' exact>
        <AuthCard {...cardData.resetCard}>
          <ChangePassword />
        </AuthCard>
      </Route>

      <Route>
        <Redirect to='/auth/login' />
      </Route>
    </Switch>
  )
}

const mapStateToProps = state => ({ user: state.user.user })

export default connect(mapStateToProps, { logoutUser })(Auth)

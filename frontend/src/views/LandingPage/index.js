import { Link } from 'react-router-dom'
import CommingSoon from '../../components/CommingSoon'

function LandingPage(props) {
  return (
    <div id='landing'>
      <h1>This will be an awesome landing page</h1>
      <CommingSoon title='LandingPage' />
      <div>
        <Link to='/auth/login'>You can login</Link> or
        <Link to='/auth/register'>You can register</Link>
      </div>
    </div>
  )
}

export default LandingPage

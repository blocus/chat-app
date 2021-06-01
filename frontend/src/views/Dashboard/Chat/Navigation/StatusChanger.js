import { connect } from 'react-redux'
import { status } from './constants'

function StatusChanger({ user, handleStatus }) {
  const currentStatus = Object.keys(status).includes(user.status) ? user.status : 'C'

  return (
    <div className={`select ${status[currentStatus].class}`}>
      <button>{status[currentStatus].label}</button>
      <div>
        {Object.values(status).map((e, k) => (
          <button key={k} onClick={() => handleStatus(e.key)}>
            {e.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({ user: state.user.user })

export default connect(mapStateToProps, {})(StatusChanger)

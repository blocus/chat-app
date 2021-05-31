import { combineReducers } from 'redux'

import userReducer from './userReducer'
import memberReducer from './memberReducer'

export default combineReducers({
  user: userReducer,
  members: memberReducer,
})

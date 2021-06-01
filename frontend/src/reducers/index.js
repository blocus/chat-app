import { combineReducers } from 'redux'

import userReducer from './userReducer'
import memberReducer from './memberReducer'
import conversationReducer from './conversationReducer'

export default combineReducers({
  user: userReducer,
  members: memberReducer,
  conversation: conversationReducer,
})

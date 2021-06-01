import * as Types from './actions/types'

const initialState = {
  members: [],
}

function memberReducer(state = initialState, action) {
  switch (action.type) {
    case Types.MEMBERS_GET:
      return { ...state, members: action.members }
    case Types.MEMBERS_UPDATE_STATUS:
      const members = JSON.parse(JSON.stringify(state.members))
      members[action.user_id] = members[action.user_id] ?? {}
      members[action.user_id].status = action.status
      return { ...state, members }
    default:
      return state
  }
}

export default memberReducer

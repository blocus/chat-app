import * as Types from './actions/types'

const initialState = {
  members: [],
}

function memberReducer(state = initialState, action) {
  switch (action.type) {
    case Types.MEMBERS_GET:
      return {
        ...state,
        members: action.members,
      }
    case Types.MEMBERS_UPDATE_STATUS:
      console.log(action)
      const members = JSON.parse(JSON.stringify(state.members))
      members[action.user_id] = members[action.user_id] ?? {}
      members[action.user_id].status = action.status
      console.log(members[action.user_id])
      // const member_index = state.members.findIndex(item => item.id === action.user_id)
      // const member = members.filter(item => item.id === action.user_id)?.[0]
      // if (member) member.status = action.status
      // console.log({ member, action })
      return { ...state, members }
    default:
      return state
  }
}

export default memberReducer

import * as Types from './actions/types'

const initialState = {
  conversations: [],
  loading: true,
}

function conversationReducer(state = initialState, action) {
  switch (action.type) {
    case Types.CONVERSATION_GET:
      return { ...state, conversations: action.data, loading: action.loading }
    case Types.CONVERSATION_SET_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export default conversationReducer

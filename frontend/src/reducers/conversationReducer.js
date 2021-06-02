import * as Types from './actions/types'

const initialState = {
  conversations: [],
  loading: true,
}

function conversationReducer(state = initialState, action) {
  let convs = state.conversations.slice()
  switch (action.type) {
    case Types.CONVERSATION_I_SAW:
      for (let index = 0; index < convs.length; index++) {
        if (convs[index].id === action.data) convs[index].seen = true
      }
      return { ...state, conversations: convs }
    case Types.CONVERSATION_UPDATE:
      for (let index = 0; index < convs.length; index++) {
        if (convs[index].id === action.data.conversationId) {
          convs[index].seen = false
          if (action.data.text) convs[index].preview = action.data.text
          else if (action.data.attachements.length !== 0) convs[index].preview = 'new Attachement'
          else convs[index].preview = 'Empty message'
          convs[index].date = action.data.createdAt
        }
      }
      convs.sort((a, b) => new Date(b.date) - new Date(a.date))

      return { ...state, conversations: convs }
    case Types.CONVERSATION_GET:
      return { ...state, conversations: action.data, loading: action.loading }
    case Types.CONVERSATION_SET_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export default conversationReducer

import * as Types from './types'
import axios from 'axios'

export const getMyConversations = () => dispach => {
  dispach({ type: Types.CONVERSATION_SET_LOADING, loading: true })
  axios
    .get('/conversation')
    .then(res => {
      dispach({ type: Types.CONVERSATION_GET, data: res.data, loading: false })
    })
    .catch(() => {
      dispach({ type: Types.CONVERSATION_GET, data: [], loading: false })
    })
}

export const updateConversation = data => dispach => {
  dispach({ type: Types.CONVERSATION_UPDATE, data })
}

export const iSaw = data => dispach => {
  dispach({ type: Types.CONVERSATION_I_SAW, data })
}

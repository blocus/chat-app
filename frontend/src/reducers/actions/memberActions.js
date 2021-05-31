import * as Types from './types'
import axios from 'axios'

export const getMembers = () => dispach => {
  axios
    .get('/members')
    .then(res => {
      let members = {}
      res.data.forEach(member => {
        members[member.id] = member
      })
      dispach({ type: Types.MEMBERS_GET, members })
    })
    .catch(() => dispach({ type: Types.MEMBERS_GET, members: {} }))
}

export const updateStatus = data => dispach => {
  dispach({ type: Types.MEMBERS_UPDATE_STATUS, ...data })
}

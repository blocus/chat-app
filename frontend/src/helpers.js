import moment from 'moment'

export const genRandomDate = () => {
  const Y = 2021
  const M = Math.floor(Math.random() * 2) + 3
  const D = Math.floor(Math.random() * 28)
  const h = Math.floor(Math.random() * 24)
  const i = Math.floor(Math.random() * 60)
  return new Date(Y, M, D, h, i)
}

export const formatDate = date => {
  const delta = Math.floor((new Date() - new Date(date)) / 1000)
  if (delta < 60) return `${delta}s`
  else if (delta < 3600) return `${Math.floor(delta / 60)}m`
  else if (delta < 86400) return `${Math.floor(delta / 3600)}h`
  return `${Math.floor(delta / 86400)}d`
}

export const formatFullDate = date => {
  return moment(date).format('LLL')
}

const lorem =
  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla ex eu est malesuada, eu malesuada nisi auctor. Curabitur eget est nulla. Quisque facilisis nisl eu gravida congue. Sed risus ipsum, ultricies eu tincidunt eget, tempus nec magna. Sed turpis justo, sagittis nec feugiat vitae, efficitur non ligula. Quisque ac dui fermentum, molestie tellus a, porttitor sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas viverra, felis et aliquet fermentum, augue felis congue felis, id blandit nisl nisl at sapien. Duis malesuada vel ex in bibendum. Mauris placerat risus lacus, non dignissim urna semper nec. In ac faucibus eros. Curabitur mattis, urna vel suscipit rutrum, purus nibh euismod lectus, id feugiat nulla ligula in tortor. Nunc sagittis luctus sagittis.'.split(
    ' '
  )

export const genRandomString = () => lorem.slice(0, Math.floor(Math.random() * 8) + 2).join(' ')

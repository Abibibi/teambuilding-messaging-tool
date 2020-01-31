import moment from './moment'

export default (allMessages) => {
  const messages = allMessages

  messages.map((message) => {
    if (message.date) {
      message.date = moment(message.date).format('LL')
    }
  })

  return messages
}

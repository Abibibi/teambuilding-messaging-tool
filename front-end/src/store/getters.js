import formattingMessagesDate from '@/utils/formattedDate'

export default {
  receivedMessagesFormattedDate: (state) => {
    const messages = formattingMessagesDate(state.receivedMessagesContent)

    return messages
  },

  sentMessagesFormattedDate: (state) => {
    const messages = formattingMessagesDate(state.sentMessagesContent)

    return messages
  }
}

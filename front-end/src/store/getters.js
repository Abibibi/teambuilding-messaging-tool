import formattingMessagesDate from '@/utils/formattedDate'

export default {
  definitiveMessages: (state) => {
    const messages = formattingMessagesDate(state.messagesContentReceived)

    return messages
  }
}

const helper = require('../helper/response')

const {
  createRoomModel,
  checkRoomModel,
  getRoomModel,
  sendMessageModel,
  getMessageModel,
  getAdminModel
} = require('../model/chat')

module.exports = {
  createRoom: async (request, response) => {
    const { sender, receiver } = request.body
    const checkRoom = await checkRoomModel(sender, receiver)
    if (checkRoom.length > 0) {
      return helper.response(response, 400, 'Chat-room Already exist')
    } else {
      const a = sender
      const b = receiver
      const roomIdUniq = Math.floor(Math.random() * 1000000 + 1)
      const setData1 = { sender: a, receiver: b, roomIdUniq }
      const setData2 = { sender: b, receiver: a, roomIdUniq }
      try {
        const result1 = await createRoomModel(setData1)
        const result2 = await createRoomModel(setData2)
        return helper.response(response, 200, 'Room Created', [
          result1,
          result2
        ])
      } catch (error) {
        return helper.response(response, 400, 'Bad Request', error)
      }
    }
  },
  getRoom: async (request, response) => {
    const { id } = request.params
    try {
      const result = await getRoomModel(id)
      return helper.response(
        response,
        200,
        'Here is your chat room list',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getAdmin: async (request, response) => {
    console.log(request)
    try {
      const result = await getAdminModel()
      return helper.response(response, 200, 'Here is admin list', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  sendMessage: async (request, response) => {
    const { roomIdUniq, sender, receiver, message } = request.body
    const setData = {
      roomIdUniq,
      sender,
      receiver,
      message
    }
    try {
      const result = await sendMessageModel(setData)
      return helper.response(response, 200, 'Message Sent', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getMessage: async (request, response) => {
    const { id } = request.params
    try {
      const result = await getMessageModel(id)
      return helper.response(
        response,
        200,
        'Here is your message history',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}

const chatbotsReducer = (
  state = [], // array of chatbots
  action
) => {
  switch (action.type) {

    case "USR_REQ_CHATBOTS_FULFILLED":
      state = [
        ...state
      ]
      // straight away = to the payload
      state = action.payload
      break

    default:
      break
  }

  return state
}

export default chatbotsReducer

const chatbotsReducer = (
    state = [],
    action
) => {
    switch (action.type) {

        case "USR_REQ_CHATBOTS_FULFILLED":
            state = [
                ...state
            ]
            state = action.payload
            break

        case "CHATBOT_UPDATE_CLIENTS":
            state = [
                ...state
            ]
            state[action.payload.cbindex].clientsList = action.payload.clientsList
            break

        default:
            break
    }

    return state
}

export default chatbotsReducer
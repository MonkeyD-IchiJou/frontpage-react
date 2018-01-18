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

        case "CHATBOT_UPDATE_CLIENTS":
            state = [
                ...state
            ]
            // update the online client list for this chatbot
            state[action.payload.cbindex].clientsList = action.payload.clientsList
            break

        case "USR_UPDATE_CHATBOT_ENTITIES":
            state = [
                ...state
            ]
            state[action.payload.cbindex].entities = action.payload.entities
            break

        case "USR_UPDATE_CHATBOT_INTENTS":
            state = [
                ...state
            ]
            state[action.payload.cbindex].intents = action.payload.intents
            break

        case "USR_UPDATE_CHATBOT_ACTIONS":
            state = [
                ...state
            ]
            state[action.payload.cbindex].actions = action.payload.actions
            break

        case "USR_UPDATE_CHATBOT_STORIES":
            state = [
                ...state
            ]
            state[action.payload.cbindex].stories = action.payload.stories
            break

        default:
            break
    }

    return state
}

export default chatbotsReducer
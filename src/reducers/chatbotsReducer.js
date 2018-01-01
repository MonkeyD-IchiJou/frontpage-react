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

        case "USR_REQ_CHATBOT_ML_DATA_FULFILLED":
            state = [
                ...state
            ]
            state[action.payload.cbindex].domain = action.payload.domain
            state[action.payload.cbindex].nlu_data = action.payload.nlu_data
            state[action.payload.cbindex].stories = action.payload.stories
            break

        default:
            break
    }

    return state
}

export default chatbotsReducer
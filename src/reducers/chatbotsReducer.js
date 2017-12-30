const chatbotsReducer = (
    state = [],
    action
) => {
    switch (action.type) {

        case "USR_REQ_CHATBOTS_FULFILLED":
            state = action.payload
            break

        default:
            break
    }

    return state
}

export default chatbotsReducer
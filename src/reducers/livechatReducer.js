const livechatReducer = (
    state = [],
    action
) => {
    switch (action.type) {

        case "USR_REQ_LIVECHATS_FULFILLED":
            state = [
                ...state
            ]
            state = action.payload
            break

        case "LIVECHAT_UPDATE_CLIENTS":
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

export default livechatReducer
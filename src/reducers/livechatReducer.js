const livechatReducer = (
    state = {
        name: '',
        description: '',
        creationdate:''
    },
    action
) => {
    switch (action.type) {

        case "USR_REQ_LIVECHAT_INFO_FULFILLED":
            state = {
                ...state,
                name: action.payload.description,
                description: action.payload.description,
                creationdate: action.payload.creationdate
            }
            break

        default:
            break

    }

    return state
}

export default livechatReducer
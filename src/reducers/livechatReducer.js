const livechatReducer = (
    state = {
        name: '',
        description: '',
        creationdate:'',
        uuid: ''
    },
    action
) => {
    switch (action.type) {

        case "USR_REQ_LIVECHAT_INFO_FULFILLED":
            state = {
                ...state,
                name: action.payload.description,
                description: action.payload.description,
                creationdate: action.payload.creationdate,
                uuid: action.payload.uuid
            }
            break

        default:
            break

    }

    return state
}

export default livechatReducer
const livechatsReducer = (
    state = [], // array of livechats
    action
) => {
    switch (action.type) {

        case "USR_REQ_LIVECHATS_FULFILLED":
            state = [
                ...state
            ]
            state = action.payload
            break

        default:
            break

    }

    return state
}

export default livechatsReducer
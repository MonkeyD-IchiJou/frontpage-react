const envReducer = (
    state = { backendUrl: '' },
    action
) => {

    switch (action.type) {
        case "SET_BACKEND_URL":
            state = {
                ...state,
                backendUrl: action.payload
            }
            break

        default:
            break
    }

    return state
}

export default envReducer

const envReducer = (
    state = { backendUrl: 'https://localhost', apploading: true },
    action
) => {

    switch (action.type) {
        case "SET_APP_LOADING":
            state = {
                ...state,
                apploading: action.payload
            }
            break

        default:
            break
    }

    return state
}

export default envReducer

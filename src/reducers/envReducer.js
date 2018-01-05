let backendUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port

if (process.env.NODE_ENV === 'development') {
    // if is in development mode
    backendUrl = 'https://localhost'
    console.log('in development', backendUrl)
}

const envReducer = (
    state = { backendUrl: backendUrl, apploading: true },
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

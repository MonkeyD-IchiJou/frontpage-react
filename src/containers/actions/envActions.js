var SetUrlPromise = (backendurl) => {
    return new Promise((resolve, reject) => {
        resolve(backendurl)
    })
}

export function setUrl_act(backendurl) {

    return {
        type: 'SET_BACKEND_URL',
        payload: SetUrlPromise(backendurl)
    }

}

export function setValidatingUser_act(payload) {

    return {
        type: 'SET_VALIDATING_USR',
        payload: payload
    }

}
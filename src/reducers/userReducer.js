const userReducer = (
    state = { userid: 0, username: '', email: '', userjoindate: '', jwt: '', uservalidate: false },
    action
) => {

    switch (action.type) {
        case "USR_REQ_LOGIN_FULFILLED":
        case "REQ_CHECKTOKEN_STORAGE_FULFILLED":

            // set the jwt into my localStorage
            localStorage.setItem('token', action.payload)

            // if there is jwt in localstorage
            state = {
                ...state,
                jwt: action.payload
            }

            break

        case "USR_REQ_INFO_FULFILLED":

            // setting up user info here
            let userpayload = action.payload
            state = {
                ...state,
                userid: userpayload.id,
                username: userpayload.username,
                email: userpayload.email,
                userjoindate: userpayload.joindate,
                uservalidate: true
            }

            break

        case "REQ_CHECKTOKEN_STORAGE_REJECTED":
        case "USR_REQ_LOGIN_REJECTED":
        case "USR_REQ_LOGOUT_FULFILLED":
        case "USR_REQ_INFO_REJECTED":

            // rm the jwt in my localStorage
            localStorage.removeItem('token')

            // reset the user state
            state = {
                ...state,
                userid: 0, 
                username: '', 
                email: '', 
                userjoindate: '', 
                jwt: '', 
                uservalidate: false
            }
            break

        default:
            break
    }

    return state
}

export default userReducer

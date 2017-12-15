const userReducer = (
    state = { username: '', email: '', jwt: '', loginErrors: '', signupErrors: '' },
    action
) => {

    switch (action.type) {
        case "USR_REQ_LOGIN_FULFILLED":

            // set the jwt into my localStorage
            localStorage.setItem('token', action.payload)

            // set the jwt state
            state = {
                ...state,
                jwt: action.payload,
                loginErrors: ''
            }

            break

        case "USR_REQ_LOGIN_REJECTED":

            // rm the jwt in my localStorage
            localStorage.removeItem('token')

            // set the loginErrors state
            state = {
                ...state,
                jwt: '',
                loginErrors: action.payload
            }

            break

        case "USR_REQ_LOGOUT":

            // rm the jwt in my localStorage
            localStorage.removeItem('token')

            // set the jwt state to null
            state = {
                ...state,
                jwt: ''
            }
            break

        default:
            break
    }

    return state
}

export default userReducer

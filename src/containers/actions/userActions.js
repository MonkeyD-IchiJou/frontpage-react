/*({
    babel: {
        presets: ['react-app']
    }
})*/

import request from 'superagent'

// ignore my self-signed ssl
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// user post request login in promise
var UserRequestLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        request
            .post('https://localhost/auth/v1/')
            .set('contentType', 'application/json; charset=utf-8')
            .set('dataType', 'json')
            .send({
                email: email,
                password: password
            })
            .end((err, res) => {

                if (err || !res.ok) {
                    let errormsg = res.body.errors
                    reject(errormsg)
                }
                else {
                    let result = res.body

                    if (!result || !result.authResult) {
                        reject('no body msg')
                    }

                    resolve(result.jwt)
                }

            })
    })
}

// user post request to check for jwt valid or not
/*var JwtRequestValidate = (jwt) => {
    return new Promise((resolve, reject) => {
        request
            .post('https://localhost/auth/v1/validate')
            .set('contentType', 'application/json; charset=utf-8')
            .set('dataType', 'json')
            .send({
                token: jwt
            })
            .end((err, res) => {

                if (err || !res.ok) {
                    let errormsg = res.body.errors
                    reject(errormsg)
                }
                else {
                    let result = res.body

                    if (!result || !result.authResult) {
                        reject('token invalid')
                    }

                    resolve(result)
                }

            })
    })
}*/

// user post request to get username and email based on jwt
var RequestUserInfo = (jwt) => {
    return new Promise((resolve, reject) => {

    })
}

// request login action
export function reqLogin_act(email, password) {
    return {
        type: 'USR_REQ_LOGIN',
        payload: UserRequestLogin(email, password)
    }
}

// request logout action
export function reqLogout_act() {
    return {
        type: 'USR_REQ_LOGOUT',
        payload: true
    }
}
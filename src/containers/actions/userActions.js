/*({
    babel: {
        presets: ['react-app']
    }
})*/

import request from 'superagent'

// ignore my self-signed ssl
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// user post request login in promise
var UserRequestLogin = (backendurl, email, password) => {
    return new Promise((resolve, reject) => {
        request
            .post(backendurl + '/auth/v1/')
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

// user post request to get username and email based on jwt
var RequestUserInfo = (backendurl, jwt) => {
    return new Promise((resolve, reject) => {
        request
            .post(backendurl + '/user/v1/')
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

                    if (!result || !result.success) {
                        reject('cannot verify user')
                    }

                    resolve(result.userinfo)
                }

            })
    })
}

var CheckTokenPromise = () => {
    return new Promise((resolve, reject) => {

        let jwt = localStorage.getItem('token')
        if (jwt) {
            resolve(jwt)
        }
        else {
            reject('no jwt in the localstorage')
        }
    })
}

// request login action
export function reqLogin_act(backendurl, email, password) {
    return {
        type: 'USR_REQ_LOGIN',
        payload: UserRequestLogin(backendurl, email, password)
    }
}

// request logout action
export function reqLogout_act() {
    return {
        type: 'USR_REQ_LOGOUT',
        payload: true
    }
}

// request getting user info
export function reqUserInfo_act(backendurl, jwt) {
    return {
        type: 'USR_REQ_INFO',
        payload: RequestUserInfo(backendurl, jwt)
    }
}

// request to see whether got any token in localstorage or not
export function reqCheckToken_act() {
    return {
        type: 'REQ_CHECKTOKEN_STORAGE',
        payload: CheckTokenPromise()
    }
}
/*({
    babel: {
        presets: ['react-app']
    }
})*/

import request from 'superagent'

// ignore my self-signed ssl
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// get all chatbots infos
var GetAllChatbotsInfos = (backendurl, jwt) => {
  return new Promise((resolve, reject) => {
    request
      .get(backendurl + '/chatbot/v1/infos')
      .query({
        token: jwt
      })
      .end((err, res) => {

        try {
          if (err || !res.ok) {
            let errormsg = res.body.errors
            throw errormsg
          }
          else {
            let result = res.body

            if (!result) {
              throw new Error('no body msg')
            }

            resolve(result.result)
          }
        } catch (e) {
          reject(e.toString())
        }

      })
  })
}

// create a new chatbot
var CreateNewChatbot = (backendurl, jwt, name, description) => {
  return new Promise((resolve, reject) => {
    request
      .post(backendurl + '/chatbot/v1/')
      .set('contentType', 'application/json; charset=utf-8')
      .set('dataType', 'json')
      .send({
        token: jwt,
        name: name,
        description: description
      })
      .end((err, res) => {

        try {
          if (err || !res.ok) {
            let errormsg = res.body.errors
            console.log(errormsg)
            throw errormsg
          }
          else {
            let result = res.body

            if (!result) {
              throw new Error('no body msg')
            }

            resolve()
          }
        } catch (e) {
          reject(e.toString())
        }

      })
  })
}

// request chatbot info action
export function reqChatbotsInfos_act(backendurl, jwt) {
  return {
    type: 'USR_REQ_CHATBOTS',
    payload: GetAllChatbotsInfos(backendurl, jwt)
  }
}

// request chatbot info action
export function createNewChatbot_act(backendurl, jwt, name, description) {
  return {
    type: 'USR_CREATE_NEW_CHATBOT',
    payload: CreateNewChatbot(backendurl, jwt, name, description)
  }
}

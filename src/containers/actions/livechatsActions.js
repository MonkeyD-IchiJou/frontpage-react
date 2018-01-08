import request from 'superagent'
import SocketConnect from './../socketapi'

// get all chatbots infos
var GetAllLivechatsInfos = (backendurl, jwt) => {
    return new Promise((resolve, reject) => {
        request
            .get(backendurl + '/livechat/v1/infos')
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

                        for (let i = 0; i < result.result.length; ++i) {
                            result.result[i].chatbotSocket = new SocketConnect(result.result[i].uuid)
                        }

                        resolve(result.result)
                    }
                } catch (e) {
                    reject(e.toString())
                }

            })
    })
}

// request login action
export function reqLivechatsInfos_act(backendurl, jwt) {
    return {
        type: 'USR_REQ_LIVECHATS',
        payload: GetAllLivechatsInfos(backendurl, jwt)
    }
}

// livechat listening for new client online
export function livechatsClientsListUpdate_act(cbindex, clientsList) {
    return {
        type: 'LIVECHAT_UPDATE_CLIENTS',
        payload: { cbindex: cbindex, clientsList: clientsList }
    }
}
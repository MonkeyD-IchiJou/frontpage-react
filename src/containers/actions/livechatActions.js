import request from 'superagent'

// get all chatbots infos
var GetLivechatInfos = (backendurl, jwt, lcuuid) => {
    return new Promise((resolve, reject) => {
        request
            .get(backendurl + '/livechat/v1/info')
            .query({
                token: jwt,
                uuid: lcuuid
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

                        resolve(result.result[0])
                    }
                } catch (e) {
                    reject(e.toString())
                }

            })
    })
}

// request login action
export function reqLivechatInfos_act(backendurl, jwt, lcuuid) {
    return {
        type: 'USR_REQ_LIVECHAT_INFO',
        payload: GetLivechatInfos(backendurl, jwt, lcuuid)
    }
}
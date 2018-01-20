/*({
    babel: {
        presets: ['react-app']
    }
})*/

import request from 'superagent'
import SocketConnect from './../classes/SocketConnect'
/*import Intent from './../classes/Intent'
import Entity from './../classes/Entity'
import Action from './../classes/Action'
import TextResponse from './../classes/TextResponse'
import ImageResponse from './../classes/ImageResponse'
import QuickReplies from './../classes/QuickReplies'
import Story from './../classes/Story'
import Path from './../classes/Path'*/

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

                        for(let i = 0; i < result.result.length; ++i) {
                            // init setting for the chatbot object

                            // setup the chatbot socket
                            result.result[i].chatbotSocket = new SocketConnect(result.result[i].uuid)

                            // first init the variables
                            result.result[i].clientsList = []
                            result.result[i].entities = []
                            result.result[i].intents = []
                            result.result[i].actions = []
                            result.result[i].stories = []
                            result.result[i].isTraining = false

                            // tmp delete later
                            /*result.result[i].entities = [
                                new Entity('cuisine', ['Chinese', 'chinese']),
                                new Entity('Outlook', ['outlook', 'OUTLOOK', 'Microsoft Outlook'])
                            ]

                            result.result[i].intents = [
                                new Intent('restaurant_search', ['cuisine'], ['show me chinese restaurants', 'chinese restaurant']),
                                new Intent('outlook_related', ['Outlook'], ['outlook got problem', 'my Microsoft Outlook got problem']),
                            ]

                            result.result[i].actions = [
                                new Action('restaurant_search_response', [
                                    [
                                        new TextResponse('hey bye'),
                                        new QuickReplies([
                                            {
                                                text: 'button name',
                                                payload: 'button payload'
                                            }
                                        ]),
                                        new ImageResponse('kek.png')
                                    ]
                                ]),
                                new Action('outlook_search_response', [
                                    [
                                        new TextResponse('yo look'),
                                        new ImageResponse('kek.png')
                                    ],
                                    [
                                        new QuickReplies([
                                            {
                                                text: 'button name',
                                                payload: 'button payload'
                                            }
                                        ])
                                    ]
                                ])
                            ]

                            result.result[i].stories = [
                                new Story('story 1', [
                                    new Path('restaurant_search', ['restaurant_search_response'])
                                ]),
                                new Story('story 2', [
                                    new Path('restaurant_search', ['restaurant_search_response']),
                                    new Path('outlook_related', ['outlook_search_response'])
                                ])
                            ]*/
                        }

                        resolve(result.result)
                    }
                } catch (e) {
                    reject(e.toString())
                }

            })
    })
}

// post my datas back to mongodb
var SaveChatbotData = (backendurl, cbuuid, cbdatas, jwt, cbid) => {
    return new Promise((resolve, reject) => {
        request
            .post(backendurl + '/chatbot/v1/CBDatas')
            .set('contentType', 'application/json; charset=utf-8')
            .set('dataType', 'json')
            .send({
                token: jwt,
                uuid: cbuuid,
                cbdatas: cbdatas
            })
            .end((err, res) => {

                try {
                    if (err || !res.ok) {
                        let errormsg = res.body.errors
                        throw errormsg
                    }
                    else {
                        let result = res.body

                        if (!result || !result.success) {
                            throw new Error('no body msg')
                        }

                        resolve({cbindex: cbid})
                    }
                } catch (e) {
                    reject(e.toString())
                }

            })
    })
}

// get chatbot datas
var GetChatbotMLData = (backendurl, cbuuid, jwt, cbid) => {
    return new Promise(async (resolve, reject) => {
        try {
            request
                .get(backendurl + '/chatbot/v1/CBDatas')
                .query({
                    token: jwt,
                    uuid: cbuuid
                })
                .end((err, res) => {
                    try {
                        if (err || !res.ok) {
                            let errormsg = res.body.errors
                            throw errormsg
                        }
                        else {
                            let result = res.body

                            if (!result || !result.success) {
                                throw new Error('no body msg')
                            }

                            resolve({result: result.result, cbindex: cbid})
                        }
                    } catch (e) {
                        reject(e.toString())
                    }
                })
        } catch(e) {
            reject(e.toString())
        }
    })
}

// request chatbot info action
export function reqChatbotsInfos_act(backendurl, jwt) {
    return {
        type: 'USR_REQ_CHATBOTS',
        payload: GetAllChatbotsInfos(backendurl, jwt)
    }
}

// chatbot listening for new client online
export function chatbotClientsListUpdate_act(cbindex, clientsList) {
    return {
        type: 'CHATBOT_UPDATE_CLIENTS',
        payload: { cbindex: cbindex, clientsList: clientsList }
    }
}

// load cbdatas back to my server
export function SaveChatbotDatas_act(backendurl, cbuuid, cbdatas, jwt, cbid) {
    return {
        type: 'SAVE_CB_DATAS',
        payload: SaveChatbotData(backendurl, cbuuid, cbdatas, jwt, cbid)
    }
}

// request to get domain, nlu data, stories of this chatbot
export function reqChatbotMLData_act(backendurl, cbuuid, jwt, cbid) {
    return {
        type: 'USR_REQ_CHATBOT_ML_DATA',
        payload: GetChatbotMLData(backendurl, cbuuid, jwt, cbid)
    }
}

// chatbot entities update
export function chatbotEntitiesUpdate_act(cbindex, entities) {
    return {
        type: 'USR_UPDATE_CHATBOT_ENTITIES',
        payload: { cbindex: cbindex, entities: entities }
    }
}

// chatbot intents update
export function chatbotIntentsUpdate_act(cbindex, intents) {
    return {
        type: 'USR_UPDATE_CHATBOT_INTENTS',
        payload: { cbindex: cbindex, intents: intents }
    }
}

// chatbot actions update
export function chatbotActionsUpdate_act(cbindex, actions) {
    return {
        type: 'USR_UPDATE_CHATBOT_ACTIONS',
        payload: { cbindex: cbindex, actions: actions }
    }
}

// chatbot stories update
export function chatbotStoriesUpdate_act(cbindex, stories) {
    return {
        type: 'USR_UPDATE_CHATBOT_STORIES',
        payload: { cbindex: cbindex, stories: stories }
    }
}

// chatbot is traing status update
export function setChatbotTrainingStatus_act(cbindex, isTraining) {
    return {
        type: 'SET_CHATBOT_TRAINING_STATUS',
        payload: { cbindex: cbindex, isTraining: isTraining }
    }
}
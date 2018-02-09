import request from 'superagent'

// get chatbot datas
var GetChatbotMLData = (backendurl, jwt, cbuuid) => {
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

              resolve({ result: result.result })
            }
          } catch (e) {
            reject(e.toString())
          }
        })
    } catch (e) {
      reject(e.toString())
    }
  })
}

// post my datas back to mongodb
var SaveChatbotData = (backendurl, cbuuid, cbdatas, jwt) => {
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

            if (!result) {
              throw new Error('no body msg')
            }

            resolve(true)
          }
        } catch (e) {
          reject(e.toString())
        }

      })
  })
}

// get single chatbot infos
var GetChatbotInfos = (backendurl, jwt, cbuuid) => {
  return new Promise((resolve, reject) => {
    request
      .get(backendurl + '/chatbot/v1/info')
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

// delete this chatbot
var DeleteChatbot = (backendurl, jwt, cbuuid) => {
  return new Promise((resolve, reject) => {
    request
      .delete(backendurl + '/chatbot/v1/')
      .set('contentType', 'application/json; charset=utf-8')
      .set('dataType', 'json')
      .send({
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

// request to get domain, nlu data, stories of this chatbot
export function reqDelCB_act(backendurl, jwt, cbuuid) {
  return {
    type: 'USR_REQ_DELETE_CB',
    payload: DeleteChatbot(backendurl, jwt, cbuuid)
  }
}

// request to get domain, nlu data, stories of this chatbot
export function reqChatbotMLData_act(backendurl, jwt, cbuuid) {
  return {
    type: 'USR_REQ_CHATBOT_ML_DATA',
    payload: GetChatbotMLData(backendurl, jwt, cbuuid)
  }
}

// load cbdatas back to my server
export function SaveChatbotDatas_act(backendurl, cbuuid, cbdatas, jwt) {
  return {
    type: 'SAVE_CB_DATAS',
    payload: SaveChatbotData(backendurl, cbuuid, cbdatas, jwt)
  }
}

// request a single chatbot info
export function reqChatbotInfos_act(backendurl, jwt, cbuuid) {
  return {
    type: 'USR_REQ_CHATBOT_INFO',
    payload: GetChatbotInfos(backendurl, jwt, cbuuid)
  }
}

// chatbot listening for new client online
export function chatbotClientsListUpdate_act(clientsList = []) {
  return {
    type: 'CHATBOT_UPDATE_CLIENTS',
    payload: { clientsList: clientsList }
  }
}

// chatbot entities update
export function chatbotEntitiesUpdate_act(entities = []) {
  return {
    type: 'USR_UPDATE_CHATBOT_ENTITIES',
    payload: { entities: entities }
  }
}

// chatbot intents update
export function chatbotIntentsUpdate_act(intents = []) {
  return {
    type: 'USR_UPDATE_CHATBOT_INTENTS',
    payload: { intents: intents }
  }
}

// chatbot actions update
export function chatbotActionsUpdate_act(actions = []) {
  return {
    type: 'USR_UPDATE_CHATBOT_ACTIONS',
    payload: { actions: actions }
  }
}

// chatbot stories update
export function chatbotStoriesUpdate_act(stories = []) {
  return {
    type: 'USR_UPDATE_CHATBOT_STORIES',
    payload: { stories: stories }
  }
}

// chatbot combinedprojs update
export function combinedCbProjs_act(combinedprojs = []) {
  return {
    type: 'USR_COMBINED_CHATBOT_PROJS',
    payload: { combinedprojs: combinedprojs }
  }
}

// chatbot is traing status update
export function setChatbotTrainingStatus_act(isTraining = false) {
  return {
    type: 'SET_CHATBOT_TRAINING_STATUS',
    payload: { isTraining: isTraining }
  }
}

/**
 * // tmp delete later
/*
refres.entities = [
    new Entity(
        'city',
        [
            new EntityValues('New York City', ['NYC', 'nyc', 'ny city']),
            new EntityValues('Manhatten City', ['MHC', 'mhc', 'mh city']),
            new EntityValues('England', ['uk', 'UK', 'british'])
        ]
    )
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
            new ImageResponse('kek.png'),
            new CustomResponse({msg: 'custom msg'}),
            new LinkResponse('link.com')
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
]


*/
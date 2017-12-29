import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger' // dun include this when in production mode
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import envReducer from './reducers/envReducer'
import userReducer from './reducers/userReducer'
import chatbotReducer from './reducers/chatbotReducer'
import livechatReducer from './reducers/livechatReducer'

const logger = createLogger({
    collapsed: true
})

export default createStore(
    combineReducers({ envReducer, userReducer, chatbotReducer, livechatReducer }),
    {},
    applyMiddleware(logger, thunk, promiseMiddleware())
)

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger' // dun include this when in production mode
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import envReducer from './reducers/envReducer'
import userReducer from './reducers/userReducer'

const logger = createLogger({
    collapsed: true
})

export default createStore(
    combineReducers({ envReducer, userReducer }),
    {},
    applyMiddleware(logger, thunk, promiseMiddleware())
)

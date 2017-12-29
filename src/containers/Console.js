import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import Livechat from './components/Livechat'

class Console extends Component {
    render() {

        const { match } = this.props

        return (
            <div>
                <Route 
                    exact 
                    path={`${match.url}/`} 
                    render={props => <Dashboard {...props} />}
                />
                <Route
                    exact
                    path={`${match.url}/chatbot`}
                    render={props => <Chatbot {...props} />}
                />
                <Route
                    exact
                    path={`${match.url}/livechat`}
                    render={props => <Livechat {...props} />}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatbotReducer: state.chatbotReducer,
        livechatReducer: state.livechatReducer
    }
}

export default connect(mapStateToProps)(Console)
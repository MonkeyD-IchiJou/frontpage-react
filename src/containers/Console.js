import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Chatbot from './Chatbot'
import Livechat from './components/Livechat'
import ConsoleHeader from './components/ConsoleHeader'
import { Container } from 'semantic-ui-react'

class Console extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'default'
        }
    }

    changeTitle = (title) => {
        this.setState({title: title})
    }

    render() {
        const { 
            match,
            ClickLogout,
            history,
            userReducer,
            chatbotsReducer,
            livechatReducer,
            backendUrl
        } = this.props

        const jwt = userReducer.jwt

        return (
            <Container>

                <ConsoleHeader ClickLogout={ClickLogout} history={history} title={this.state.title}/>

                <Route
                    exact
                    path={`${match.url}/`}
                    render={
                        props => <Dashboard
                            {...props}
                            changeTitle={this.changeTitle}
                            userReducer={userReducer}
                            chatbotsReducer={chatbotsReducer}
                            livechatsReducer={livechatReducer}
                            backendUrl={backendUrl}
                        />
                    }
                />

                <Route
                    path={`${match.url}/chatbot/:topicId`}
                    render={
                        props => <Chatbot
                            {...props}
                            jwt={jwt}
                            usremail={userReducer.email}
                            backendUrl={backendUrl}
                            changeTitle={this.changeTitle}
                        />
                    }
                />

                <Route
                    path={`${match.url}/livechat`}
                    render={
                        props => <Livechat
                            {...props}
                            changeTitle={this.changeTitle}
                            livechatsReducer={livechatReducer}
                            sendClientMsg={this.LivechatSendClientMsg}
                        />
                    }
                />

            </Container>
        )
    }
}

export default Console
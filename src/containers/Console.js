import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import Livechat from './components/Livechat'
import ConsoleHeader from './components/ConsoleHeader'
import { reqChatbotsInfos_act } from './actions/chatbotsActions'
import { Container } from 'semantic-ui-react'

class Console extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: 'default'
        }
    }

    componentDidMount() {
        this.getAllChatbotsInfo()
    }

    changeTitle = (title) => {
        this.setState({title: title})
    }

    getAllChatbotsInfo = () => {
        let userReducer = this.props.userReducer
        this.props.dispatch(reqChatbotsInfos_act(this.props.backendUrl, userReducer.jwt))
    }

    render() {
        const { match } = this.props

        return (
            <Container>
                
                <ConsoleHeader ClickLogout={this.props.ClickLogout} history={this.props.history} title={this.state.title}/>
                
                <Route 
                    exact 
                    path={`${match.url}/`} 
                    render={props => <Dashboard {...props} changeTitle={this.changeTitle} userReducer={this.props.userReducer} chatbotsReducer={this.props.chatbotsReducer}/>}
                />
                <Route
                    exact
                    path={`${match.url}/chatbot`}
                    render={props => <Chatbot {...props} changeTitle={this.changeTitle}/>}
                />
                <Route
                    exact
                    path={`${match.url}/livechat`}
                    render={props => <Livechat {...props} changeTitle={this.changeTitle}/>}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatbotsReducer: state.chatbotsReducer,
        livechatReducer: state.livechatReducer
    }
}

export default connect(mapStateToProps)(Console)
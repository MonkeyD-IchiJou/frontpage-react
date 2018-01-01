import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import Livechat from './components/Livechat'
import ConsoleHeader from './components/ConsoleHeader'
import { reqChatbotsInfos_act, chatbotClientsListUpdate_act } from './actions/chatbotsActions'
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
        this.props.dispatch(reqChatbotsInfos_act(this.props.backendUrl, userReducer.jwt)).then((result) => {
            this.connectChatbots()
            // get domain, stories and nlu too
        }).catch((e) => {
            console.log(e)
        })
    }

    connectChatbots = () => {
        let backendUrl = this.props.backendUrl
        let chatbotsReducer = this.props.chatbotsReducer

        for(let i = 0; i < chatbotsReducer.length; ++i) {
            let chatbotSocket = chatbotsReducer[i].chatbotSocket
            let roomId = chatbotsReducer[i].uuid

            // connect to my socket server
            chatbotSocket.connectSocket(backendUrl + '/cbIO')

            // my chatbot socket server subscription
            chatbotSocket.subscribe('connect', () => {
                // first, asking to join my chatbot room
                chatbotSocket.socketEmit('admin_join_room', {
                    roomId: roomId
                })

                chatbotSocket.subscribe('admin_joined', (data) => {
                    // client successfully joined the room liao
                })

                chatbotSocket.subscribe('clientlist_update', (data) => {
                    // when there are someone connect to this chatbot, admin will get notified
                    this.props.dispatch(chatbotClientsListUpdate_act(i, data.clientsInfo))
                })

            })
        }
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
                    path={`${match.url}/chatbot`}
                    render={props => <Chatbot {...props} changeTitle={this.changeTitle} chatbotsReducer={this.props.chatbotsReducer}/>}
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
        livechatReducer: state.livechatReducer,
        cbclients: state.chatbotsReducer.clientsList
    }
}

export default connect(mapStateToProps)(Console)
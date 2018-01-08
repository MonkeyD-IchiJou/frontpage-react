import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'
import Livechat from './components/Livechat'
import ConsoleHeader from './components/ConsoleHeader'
import { reqChatbotsInfos_act, chatbotClientsListUpdate_act, reqChatbotMLData_act } from './actions/chatbotsActions'
import { reqLivechatsInfos_act, livechatsClientsListUpdate_act } from './actions/livechatsActions'
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
        this.getAllLivechatsInfo()
    }

    changeTitle = (title) => {
        this.setState({title: title})
    }

    getAllChatbotsInfo = () => {
        let userReducer = this.props.userReducer
        this.props.dispatch(reqChatbotsInfos_act(this.props.backendUrl, userReducer.jwt)).then((result) => {
            this.connectChatbots()
            this.updateChatbotMLData()
        }).catch((e) => {
            console.log(e)
        })
    }

    getAllLivechatsInfo = () => {
        let userReducer = this.props.userReducer
        this.props.dispatch(reqLivechatsInfos_act(this.props.backendUrl, userReducer.jwt)).then((result) => {
            this.connectLivechats()
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

    connectLivechats = () => {
        let backendUrl = this.props.backendUrl
        let livechatsReducer = this.props.livechatReducer
        let userReducer = this.props.userReducer

        for (let i = 0; i < livechatsReducer.length; ++i) {
            let livechatSocket = livechatsReducer[i].chatbotSocket
            let roomId = livechatsReducer[i].uuid

            // connect to my socket server
            livechatSocket.connectSocket(backendUrl + '/lcIO')

            // my livechat socket server subscription
            livechatSocket.subscribe('connect', () => {

                // first, asking to join my chatbot room
                livechatSocket.socketEmit('admin_join_room', { roomId: roomId, username: userReducer.username, userid: userReducer.userid })

                // waiting for confirmation for joining room
                livechatSocket.subscribe('admin_joined', (data) => {
                    console.log('successfully joined the room liao')
                })

                // admin constantly listening for new update of client list
                livechatSocket.subscribe('clientlist_update', (data) => {
                    // when there are someone connect to this chatbot, admin will get notified
                    this.props.dispatch(livechatsClientsListUpdate_act(i, data.clientsInfo))
                })

                // waiting for any clients to send me some msg
                livechatSocket.subscribe('admin_receiving_msg', (data) => {
                    console.log(data)
                })

            })
        }
    }

    updateChatbotMLData = () => {
        let userReducer = this.props.userReducer
        const chatbotsReducer = this.props.chatbotsReducer
        for (let i = 0; i < chatbotsReducer.length; ++i) {
            this.props.dispatch(reqChatbotMLData_act(this.props.backendUrl, chatbotsReducer[i].uuid, userReducer.jwt, i))
        }
    }

    render() {
        const { match, ClickLogout, history, userReducer, chatbotsReducer, livechatReducer } = this.props

        return (
            <Container>
                
                <ConsoleHeader ClickLogout={ClickLogout} history={history} title={this.state.title}/>
                
                <Route 
                    exact 
                    path={`${match.url}/`} 
                    render={props => <Dashboard {...props} changeTitle={this.changeTitle} userReducer={userReducer} chatbotsReducer={chatbotsReducer} livechatsReducer={livechatReducer}/>}
                />
                <Route
                    path={`${match.url}/chatbot`}
                    render={props => <Chatbot {...props} changeTitle={this.changeTitle} chatbotsReducer={chatbotsReducer} />}
                />
                <Route
                    path={`${match.url}/livechat`}
                    render={props => <Livechat {...props} changeTitle={this.changeTitle} livechatsReducer={livechatReducer}/>}
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Chatbot from './Chatbot'
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
        const { userReducer, backendUrl } = this.props
        const jwt = userReducer.jwt
        this.props.dispatch(reqChatbotsInfos_act(backendUrl, jwt)).then((result) => {
            this.connectChatbots(backendUrl)
            this.updateChatbotMLData(backendUrl, jwt)
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

    connectChatbots = (backendUrl) => {
        // get all the chatbots infos
        let chatbotsReducer = this.props.chatbotsReducer

        chatbotsReducer.forEach((chatbot, index)=>{
            // get this chatbot socket
            let chatbotSocket = chatbot.chatbotSocket

            // trying to join a room by its uuid
            let roomId = chatbot.uuid

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
                    this.props.dispatch(chatbotClientsListUpdate_act(index, data.clientsInfo))
                })

            })
        })
    }

    connectLivechats = () => {
        let backendUrl = this.props.backendUrl
        let livechatsReducer = this.props.livechatReducer
        let userReducer = this.props.userReducer

        livechatsReducer.forEach((livechat, index)=>{
            let livechatSocket = livechat.livechatSocket
            let roomId = livechat.uuid

            // connect to my socket server
            livechatSocket.connectSocket(backendUrl + '/lcIO')

            // my livechat socket server subscription
            livechatSocket.subscribe('connect', () => {

                // first, asking to join my chatbot room
                livechatSocket.socketEmit('admin_join_room', { 
                    roomId: roomId,
                    username: userReducer.username,
                    userid: userReducer.userid
                })

                // waiting for confirmation for joining room
                livechatSocket.subscribe('admin_joined', (data) => {

                })

                // admin constantly listening for new update of client list
                livechatSocket.subscribe('clientlist_update', (data) => {
                    // when there are someone connect to this chatbot, admin will get notified
                    this.props.dispatch(livechatsClientsListUpdate_act(index, data.clientsInfo))
                })

                // waiting for any clients to send me some msg
                livechatSocket.subscribe('admin_receiving_msg', (data) => {
                    console.log(data)
                })

            })
        })

        /*for (let i = 0; i < livechatsReducer.length; ++i) {
            let livechatSocket = livechatsReducer[i].livechatSocket
            let roomId = livechatsReducer[i].uuid

            // connect to my socket server
            livechatSocket.connectSocket(backendUrl + '/lcIO')

            // my livechat socket server subscription
            livechatSocket.subscribe('connect', () => {

                // first, asking to join my chatbot room
                livechatSocket.socketEmit('admin_join_room', { roomId: roomId, username: userReducer.username, userid: userReducer.userid })

                // waiting for confirmation for joining room
                livechatSocket.subscribe('admin_joined', (data) => {
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
        }*/
    }

    LivechatSendClientMsg = (livechatUUID, clientSocketId, clientUsername, msg) => {

        let userReducer = this.props.userReducer
        let livechatsReducer = this.props.livechatReducer
        let livechatSocket = ''

        for (let i = 0; i < livechatsReducer.length; ++i) {
            if (livechatsReducer[i].uuid === livechatUUID) {
                livechatSocket = livechatsReducer[i].livechatSocket
            }
        }

        if (livechatSocket) {
            livechatSocket.socketEmit('admin_send_client_msg', {
                clientSocketId: clientSocketId,
                clientUsername: clientUsername,
                username: userReducer.username,
                userid: userReducer.userid,
                msg: msg
            })
        }

    }

    updateChatbotMLData = (backendUrl, jwt) => {
        const chatbotsReducer = this.props.chatbotsReducer
        for (let i = 0; i < chatbotsReducer.length; ++i) {
            // get all the training datas from each chatbot
            this.props.dispatch(reqChatbotMLData_act(backendUrl, chatbotsReducer[i].uuid, jwt, i))
        }
    }

    render() {
        const { 
            match,
            ClickLogout,
            history,
            userReducer,
            chatbotsReducer,
            livechatReducer
        } = this.props

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
                        />
                    }
                />

                <Route
                    path={`${match.url}/chatbot`}
                    render={
                        props => <Chatbot
                            {...props}
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

const mapStateToProps = (state) => {
    return {
        chatbotsReducer: state.chatbotsReducer,
        livechatReducer: state.livechatReducer
    }
}

export default connect(mapStateToProps)(Console)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqChatbotsInfos_act, chatbotClientsListUpdate_act, reqChatbotMLData_act } from './actions/chatbotsActions'
import UsrDashboard from './components/UsrDashboard'
import CbDashboard from './components/CbDashboard'
import LcDashboard from './components/LcDashboard'
import { Grid } from 'semantic-ui-react'

class Dashboard extends Component {

    componentDidMount() {
        // change the header title to dashboard
        this.props.changeTitle('Dashboard')

        const { userReducer, backendUrl } = this.props
        const jwt = userReducer.jwt

        // get all the chatbot projects info that this user own
        this.props.dispatch(reqChatbotsInfos_act(backendUrl, jwt))

        // same thing for live chat projects
    }

    connectChatbots = (backendUrl) => {
        // get all the chatbots infos
        let chatbotsReducer = this.props.chatbotsReducer

        chatbotsReducer.forEach((chatbot, index) => {
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

    updateChatbotMLData = (backendUrl, jwt) => {
        const chatbotsReducer = this.props.chatbotsReducer
        for (let i = 0; i < chatbotsReducer.length; ++i) {
            // get all the training datas from each chatbot
            this.props.dispatch(reqChatbotMLData_act(backendUrl, chatbotsReducer[i].uuid, jwt, i))
        }
    }

    render() {
        const { userReducer, chatbotsReducer, livechatsReducer } = this.props

        return (
            <Grid stackable columns='equal'>

                <Grid.Column>
                    <UsrDashboard userReducer={userReducer} chatbotsReducer={chatbotsReducer} livechatsReducer={livechatsReducer}/>
                </Grid.Column>

                <Grid.Column>
                    <CbDashboard chatbotsReducer={chatbotsReducer}/>
                </Grid.Column>

                <Grid.Column>
                    <LcDashboard livechatsReducer={livechatsReducer}/>
                </Grid.Column>

            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatbotsReducer: state.chatbotsReducer,
        livechatReducer: state.livechatReducer
    }
}

export default connect(mapStateToProps)(Dashboard)

/**
 * getAllLivechatsInfo = () => {
        let userReducer = this.props.userReducer
        this.props.dispatch(reqLivechatsInfos_act(this.props.backendUrl, userReducer.jwt)).then((result) => {
            this.connectLivechats()
        }).catch((e) => {
            console.log(e)
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
    /*}

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
 */

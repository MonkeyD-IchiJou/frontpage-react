import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqLivechatInfos_act } from './actions/livechatActions'
import SocketConnect from './classes/SocketConnect'
import DisplayLivechatPage from './components/DisplayLivechatPage'

class Livechat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            livechatSocket: new SocketConnect(this.props.match.params.topicId),
            clientLists: [],
            currentClient: {},
            currentChatLogs: []
        }
    }

    componentDidMount() {
        // change the header title to dashboard
        this.props.changeTitle('Livechat Console')

        // req this livechat project info
        const { jwt, backendUrl, match, userReducer } = this.props
        const lcuuid = match.params.topicId
        this.props.dispatch(reqLivechatInfos_act(backendUrl, jwt, lcuuid))

        // and then connect to my socket server
        let livechatSocket = this.state.livechatSocket

        // disconnect the previous live chat if exist
        livechatSocket.disconnectSocket()

        livechatSocket.connectSocket(backendUrl + '/lcIO')

        // my livechat socket server subscription
        livechatSocket.subscribe('connect', () => {

            // first, asking to join my chatbot room
            livechatSocket.socketEmit('admin_join_room', {
                roomId: lcuuid,
                username: userReducer.username,
                userid: userReducer.userid
            })

            // waiting for confirmation for joining room
            livechatSocket.subscribe('admin_joined', (data) => {

            })

            // admin constantly listening for new update of client list
            livechatSocket.subscribe('clientlist_update', (data) => {
                // when there are someone connect to this chatbot, admin will get notified
                this.setState({ clientLists: data.clientsInfo})
            })

            // waiting for any clients to send me some msg
            livechatSocket.subscribe('admin_receiving_msg', (data) => {
                this.setState({ currentChatLogs: [...this.state.currentChatLogs, {msg: data.msg, id: data.clientSocketId}] })
            })

        })

    }

    componentWillUnmount() {
        // disconnect my socket server pls
        this.state.livechatSocket.disconnectSocket()
    }

    LivechatSendClientMsg = (clientSocketId, clientUsername, msg) => {

        const { userReducer } = this.props
        let livechatSocket = this.state.livechatSocket

        if (livechatSocket) {
            this.setState({ currentChatLogs: [...this.state.currentChatLogs, {msg: msg, id: 'admin'}] })
            livechatSocket.socketEmit('admin_send_client_msg', {
                clientSocketId: clientSocketId,
                clientUsername: clientUsername,
                username: userReducer.username,
                userid: userReducer.userid,
                msg: msg
            })
        }

    }

    selectCurrentClientToChatWith = (index) => {
        this.setState({ currentClient: this.state.clientLists[index] })
    }

    render() {
        const { livechatReducer, match, history, backendUrl } = this.props
        const { clientLists, currentClient, currentChatLogs } = this.state

        return (
            <DisplayLivechatPage
                match={match}
                history={history}
                chosenLivechat={livechatReducer}
                clientOnlineLists={clientLists}
                selectCurrentClientToChatWith={this.selectCurrentClientToChatWith}
                LivechatSendClientMsg={this.LivechatSendClientMsg}
                currentClient={currentClient}
                currentChatLogs={currentChatLogs}
                backendUrl={backendUrl}
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        livechatReducer: state.livechatReducer
    }
}

export default connect(mapStateToProps)(Livechat)
















/*class HardcodedSendMsg extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clientSocketId: '',
            clientName: '',
            msg: ''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { clientSocketId, clientName, msg } = this.state
        this.props.sendMsg(clientSocketId, clientName, msg)
        console.log('send liao')
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input required name='clientSocketId' placeholder='Enter clientId' onChange={this.handleChange} />
                <Form.Input required name='clientName' placeholder='Enter the name' onChange={this.handleChange} />
                <Form.Input required name='msg' placeholder='Enter the msg' onChange={this.handleChange} />
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

class DisplayLivechat extends Component {
    sendMsg = (clientSocketId, clientName, msg) => {
        let livechatUUID = this.props.match.params.topicId
        this.props.sendClientMsg(livechatUUID, clientSocketId, clientName, msg)
    }

    render() {
        const livechatsReducer = this.props.livechatsReducer
        const livechatUUID = this.props.match.params.topicId
        let livechatInfo = {}

        for (let i = 0; i < livechatsReducer.length; ++i) {
            if (livechatsReducer[i].uuid === livechatUUID) {
                livechatInfo = livechatsReducer[i]
            }
        }

        let clientsList = ''
        if (livechatInfo.clientsList) {
            clientsList = livechatInfo.clientsList.map((clients) =>
                <Table.Row key={clients.clientSocketId}>
                    <Table.Cell>{clients.clientSocketId}</Table.Cell>
                    <Table.Cell>{clients.clientName}</Table.Cell>
                    <Table.Cell>{clients.clientMsg}</Table.Cell>
                </Table.Row>
            )
        }

        return(
            <div>
                <Header>Total clients online right now</Header>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Header>id</Header>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header>name</Header>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header>problem</Header>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    {livechatInfo.clientsList && 
                        <Table.Body>
                            {clientsList}
                        </Table.Body>
                    }

                </Table>
                <HardcodedSendMsg sendMsg={this.sendMsg}/>
            </div>
        )
    }
}*/

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
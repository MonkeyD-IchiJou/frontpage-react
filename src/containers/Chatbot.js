import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    chatbotEntitiesUpdate_act,
    chatbotIntentsUpdate_act,
    chatbotActionsUpdate_act,
    chatbotStoriesUpdate_act,
    SaveChatbotDatas_act,
    setChatbotTrainingStatus_act,
    reqChatbotMLData_act,
    chatbotClientsListUpdate_act,
    reqChatbotInfos_act
} from './actions/chatbotActions'
import request from 'superagent'
import DisplayChatbotPage from './components/DisplayChatbotPage'

class Chatbot extends Component {

    componentDidMount() {
        // change the header title to dashboard
        this.props.changeTitle('Chatbot Console')

        // first I need to request all the datas tht this chatbot has
        const { jwt, backendUrl } = this.props
        this.props.dispatch(reqChatbotMLData_act(backendUrl, jwt, this.props.match.params.topicId))
        this.props.dispatch(reqChatbotInfos_act(backendUrl, jwt, this.props.match.params.topicId))

        // rmb to connect to my socket server
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

    updateEntities = (entities) => {
        // there is a chatbot want to update its entities
        this.props.dispatch(chatbotEntitiesUpdate_act(entities))
    }

    updateIntents = (intents) => {
        // there is a chatbot want to update its intents
        this.props.dispatch(chatbotIntentsUpdate_act(intents))
    }

    updateActions = (actions) => {
        // there is a chatbot want to update its actions
        this.props.dispatch(chatbotActionsUpdate_act(actions))
    }

    updateStories = (stories) => {
        // there is a chatbot want to update its stories
        this.props.dispatch(chatbotStoriesUpdate_act(stories))
    }

    // save and train the chatbot datas, need give uuid for knowing which cb is it
    SaveChatbotDatas = (cbdatas) => {
        const { jwt, backendUrl } = this.props
        this.props.dispatch(setChatbotTrainingStatus_act(true))
        this.props.dispatch(SaveChatbotDatas_act(backendUrl, this.props.match.params.topicId, cbdatas, jwt))
    }

    // simple testing with my nlu engine, uuid for knowing which cb to communicate to
    checkQuery = (textmsg, callback) => {
        const { backendUrl, usremail } = this.props
        request
            .post(backendUrl + '/chatbot/v1/query')
            .set('contentType', 'application/json; charset=utf-8')
            .set('dataType', 'json')
            .send({
                uuid: this.props.match.params.topicId,
                text_message: textmsg,
                sender_id: usremail
            })
            .end((err, res) => {

                try {
                    if (err || !res.ok) {
                        let errormsg = res.body.errors
                        throw errormsg
                    }
                    else {
                        let result = res.body

                        if (!result) {
                            throw new Error('no body msg')
                        }

                        this.executeAction(backendUrl, result.next_action, usremail, callback, [result])

                    }
                } catch (e) {
                    console.log(e.toString())
                }

            })
    }

    executeAction = (backendUrl, next_action, sender_id, callback, compileActions) => {
        if (next_action === 'action_listen') {
            // stop calling execute action liao.. done
            callback(compileActions)
        }
        else {

            // if there is still got next action
            request
                .post(backendUrl + '/chatbot/v1/executeAction')
                .set('contentType', 'application/json; charset=utf-8')
                .set('dataType', 'json')
                .send({
                    uuid: this.props.match.params.topicId,
                    action: next_action,
                    sender_id: sender_id
                })
                .end((err, res)=>{

                    try {
                        if (err || !res.ok) {
                            let errormsg = res.body.errors
                            throw errormsg
                        }
                        else {
                            let result = res.body

                            if (!result) {
                                throw new Error('no body msg')
                            }

                            // store the action definition
                            compileActions.push(result.returnAct)

                            // execute again to see whether still got any action need to execute mah
                            this.executeAction(backendUrl, result.result.next_action, sender_id, callback, compileActions)

                        }
                    } catch (e) {
                        console.log(e.toString())
                    }

                })

        }
    }

    render() {
        const { chatbotReducer, match, history } = this.props
        return (
            <DisplayChatbotPage
                match={match}
                history={history}
                chosenChatbot={chatbotReducer}
                updateEntities={this.updateEntities}
                updateIntents={this.updateIntents}
                updateActions={this.updateActions}
                updateStories={this.updateStories}
                SaveChatbotDatas={this.SaveChatbotDatas}
                checkQuery={this.checkQuery}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatbotReducer: state.chatbotReducer
    }
}

export default connect(mapStateToProps)(Chatbot)

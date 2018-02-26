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
  reqChatbotInfos_act,
  reqDelCB_act,
  combinedCbProjs_act,
  setChatbotInitialResponse_act
} from './actions/chatbotActions'
import request from 'superagent'
import SocketConnect from './classes/SocketConnect'
import DisplayChatbotPage from './components/DisplayChatbotPage'

class Chatbot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chatbotSocket: new SocketConnect(this.props.match.params.topicId),
      clientLists: []
    }
  }

  componentDidMount() {
    // change the header title to dashboard
    this.props.changeTitle('Chatbot Console')

    // first I need to request all the datas tht this chatbot has
    const { jwt, backendUrl, match } = this.props
    const cbuuid = match.params.topicId
    this.props.dispatch(reqChatbotMLData_act(backendUrl, jwt, cbuuid))
    this.props.dispatch(reqChatbotInfos_act(backendUrl, jwt, cbuuid))

    // rmb to connect to my socket server
    let chatbotSocket = this.state.chatbotSocket

    // disconnect the previous socket if exist
    chatbotSocket.disconnectSocket()

    chatbotSocket.connectSocket(backendUrl + '/cbIO')

    // my chatbot socket server subscription
    chatbotSocket.subscribe('connect', () => {

      // first, asking to join my chatbot room
      chatbotSocket.socketEmit('admin_join_room', {
        roomId: cbuuid
      })

      chatbotSocket.subscribe('admin_joined', (data) => {
        // client successfully joined the room liao
      })

      chatbotSocket.subscribe('clientlist_update', (data) => {
        // when there are someone connect to this chatbot, admin will get notified
        this.setState({ clientLists: data.clientsInfo })
      })

    })

  }

  componentWillUnmount() {
    // disconnect my socket server pls
    this.state.chatbotSocket.disconnectSocket()
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

  combinedCbProjs = (combinedprojs) => {
    this.props.dispatch(combinedCbProjs_act(combinedprojs))
  }

  // save and train the chatbot datas, need give uuid for knowing which cb is it
  SaveChatbotDatas = (cbdatas) => {
    const { jwt, backendUrl } = this.props
    this.props.dispatch(setChatbotTrainingStatus_act(true))
    this.props.dispatch(SaveChatbotDatas_act(backendUrl, this.props.match.params.topicId, cbdatas, jwt))
  }

  SetInitResponse = (initialResponse) => {
    this.props.dispatch(setChatbotInitialResponse_act(initialResponse))
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
        sender_id: 'admin: '+ usremail
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

            this.executeAction(backendUrl, result.next_action, usremail, callback, [result.tracker])

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

              // store the action definition
              compileActions.push({ actionName: next_action, actionsExecuted: result.returnAct })

              // execute again to see whether still got any action need to execute mah
              this.executeAction(backendUrl, result.result.next_action, sender_id, callback, compileActions)

            }
          } catch (e) {
            console.log(e.toString())
          }

        })

    }
  }

  DeleteChatbot = () => {
    const { jwt, backendUrl, dispatch, history } = this.props
    dispatch(reqDelCB_act(backendUrl, jwt, this.props.match.params.topicId)).then(()=>{
      history.push('/console')
    })
  }

  render() {
    const { chatbotReducer, match, history, backendUrl, jwt } = this.props
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
        uuid={match.params.topicId}
        checkQuery={this.checkQuery}
        backendUrl={backendUrl}
        DeleteChatbot={this.DeleteChatbot}
        clientLists={this.state.clientLists}
        combinedCbProjs={this.combinedCbProjs}
        SetInitResponse={this.SetInitResponse}
        jwt={jwt}
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

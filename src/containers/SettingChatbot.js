import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqChatbotsInfos_act } from './actions/chatbotsActions'
import DisplayChatbotInfo from './components/DisplayChatbotInfo'
import ConfirmDelete from './components/ConfirmDelete'
import CombineChatbotProjs from './components/CombineChatbotProjs'
import EditInitRes from './components/EditInitRes'

class SettingChatbot extends Component {

  componentDidMount() {
    // get all the chatbot projects info that this user own
    const { jwt, backendUrl } = this.props
    this.props.dispatch(reqChatbotsInfos_act(backendUrl, jwt))
  }

  render() {
    const { backendUrl, chatbotInfo, DeleteChatbot, chatbotsReducer, combinedCbProjs, SetInitResponse } = this.props

    return (
      <div>
        
        <DisplayChatbotInfo backendUrl={backendUrl} chatbotInfo={chatbotInfo} />

        <CombineChatbotProjs chatbotInfo={chatbotInfo} chatbotsReducer={chatbotsReducer} combinedCbProjs={combinedCbProjs}/>

        <EditInitRes initialResponse={chatbotInfo.initialResponse} SetInitResponse={SetInitResponse}/>

        <ConfirmDelete confirmAction={() => {
          DeleteChatbot()
        }} />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatbotsReducer: state.chatbotsReducer
  }
}

export default connect(mapStateToProps)(SettingChatbot)

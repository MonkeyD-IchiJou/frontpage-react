import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class DisplayChatbot extends Component {

    render() {

        const chatbotsReducer = this.props.chatbotsReducer
        const chatbotUUID = this.props.match.params.topicId
        let chatbotInfo = {}
        for (let i = 0; i < chatbotsReducer.length; ++i) {
            if (chatbotsReducer[i].uuid === chatbotUUID) {
                chatbotInfo = chatbotsReducer[i]
            }
        }

        let clientsList = ''

        if (chatbotInfo.clientsList) {
            clientsList = chatbotInfo.clientsList.map((clients) =>
                <div key={clients.clientSocketId}>
                    {clients.clientSocketId}
                </div>
            )
        }

        return(
            <div>
                <h3>{chatbotInfo.uuid}</h3>
                {clientsList}
            </div>
        )
    }

}

class Chatbot extends Component {
   
    componentDidMount() {
        // change the header title to dashboard
        this.props.changeTitle('Chatbot')
    }
    render() {

        return (
            <div>
                <Route 
                    path={`${this.props.match.url}/:topicId`} 
                    render={props => <DisplayChatbot {...props} chatbotsReducer={this.props.chatbotsReducer}/>}
                />
            </div>
        )
    }
}

export default Chatbot
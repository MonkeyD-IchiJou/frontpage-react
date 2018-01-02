import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ReactJson from 'react-json-view'
import { Grid } from 'semantic-ui-react'

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
            <Grid stackable columns='equal'>
                <Grid.Row columns='equal'>
                    <Grid.Column>
                        <h3>Domain</h3>
                        <ReactJson src={chatbotInfo.domain} />
                    </Grid.Column>

                    <Grid.Column>
                        <h3>Intents</h3>
                        <ReactJson src={chatbotInfo.nlu_data} />
                    </Grid.Column>

                    <Grid.Column>
                        <h3>Stories</h3>
                        <ReactJson src={chatbotInfo.stories} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns='equal'>
                    <Grid.Column>
                        <h3>Chatbot public token: </h3>
                        {chatbotInfo.uuid}
                    </Grid.Column>

                    <Grid.Column>
                        <h3>Total Chatbots Online: </h3>
                        {clientsList}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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
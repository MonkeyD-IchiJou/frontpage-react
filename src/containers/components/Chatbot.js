import React, { Component } from 'react'
import { Route } from 'react-router-dom'
//import ReactJson from 'react-json-view'
import ChatbotConsole from './ChatbotConsole'
import { Grid, Segment } from 'semantic-ui-react'

class DisplayChatbot extends Component {

    render() {

        const chatbotsReducer = this.props.chatbotsReducer

        if (chatbotsReducer.length > 0) {
            // if there are any chatbots

            const chatbotIndex = this.props.match.params.topicId

            return (
                <Grid columns={2} stackable divided>

                    <Grid.Column width={11}>
                        <ChatbotConsole match={this.props.match} history={this.props.history} chatbotInfo={chatbotsReducer[chatbotIndex]}/>
                    </Grid.Column>

                    <Grid.Column width={5}>
                        <Segment>kekek</Segment>
                    </Grid.Column>

                </Grid>
            )
        }
        else {
            return(<div>loading chatbot info</div>)
        }

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

/*
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
*/
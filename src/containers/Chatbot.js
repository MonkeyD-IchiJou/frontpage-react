import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import ChatbotConsole from './components/ChatbotConsole'
import { Grid, Segment } from 'semantic-ui-react'
import { chatbotEntitiesUpdate_act } from './actions/chatbotsActions'

class DisplayChatbotPage extends Component {

    updateEntities = (entities) => {
        // this is the chatbot that want to update the entities
        this.props.updateEntities(this.props.match.params.topicId, entities)
    }

    render() {

        const chatbotsReducer = this.props.chatbotsReducer

        if (chatbotsReducer.length > 0) {
            // if there are any chatbots

            const chatbotIndex = this.props.match.params.topicId
            let chosenChatbot = chatbotsReducer[chatbotIndex]

            return (
                <Grid columns={2} stackable divided>

                    <Grid.Column width={11}>
                        <ChatbotConsole
                            match={this.props.match}
                            history={this.props.history}
                            chatbotInfo={chosenChatbot}
                            updateEntities={this.updateEntities}
                        />
                    </Grid.Column>

                    <Grid.Column width={5}>
                        <Segment>Chatbot Testing</Segment>
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
        this.props.changeTitle('Chatbot Console')
    }

    updateEntities = (cbindex, entities) => {
        // there is a chatbot want to update its entities
        this.props.dispatch(chatbotEntitiesUpdate_act(cbindex, entities))
    }

    render() {
        return (
            <div>
                <Route 
                    path={`${this.props.match.url}/:topicId`} 
                    render={props => <DisplayChatbotPage {...props} chatbotsReducer={this.props.chatbotsReducer} updateEntities={this.updateEntities}/>}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatbotsReducer: state.chatbotsReducer
    }
}

export default connect(mapStateToProps)(Chatbot)

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
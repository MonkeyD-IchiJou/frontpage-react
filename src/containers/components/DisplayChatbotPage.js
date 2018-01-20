import React, { Component } from 'react'
import ChatbotConsole from './ChatbotConsole'
import FooterForm from './FooterForm'
import ReactJson from 'react-json-view'
import { Grid, Segment, Button, Icon } from 'semantic-ui-react'

class DisplayChatbotPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displayTmpJson: {}
        }
    }

    updateEntities = (entities) => {
        // this is the chatbot that want to update the entities
        this.props.updateEntities(this.props.match.params.topicId, entities)
    }

    updateIntents = (intents) => {
        // this is the chatbot that want to update the intents
        this.props.updateIntents(this.props.match.params.topicId, intents)
    }

    updateActions = (actions) => {
        // this is the chatbot that want to update the actions
        this.props.updateActions(this.props.match.params.topicId, actions)
    }

    updateStories = (stories) => {
        // this is the chatbot that want to update the stories
        this.props.updateStories(this.props.match.params.topicId, stories)
    }

    // save chatbot datas and Train
    SaveChatbotDatas = (chosenChatbot, cbid) => {
        this.props.SaveChatbotDatas(
            chosenChatbot.uuid,
            {
                entities: chosenChatbot.entities,
                intents: chosenChatbot.intents,
                actions: chosenChatbot.actions,
                stories: chosenChatbot.stories
            },
            cbid
        )
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
                            updateIntents={this.updateIntents}
                            updateActions={this.updateActions}
                            updateStories={this.updateStories}
                        />
                    </Grid.Column>

                    <Grid.Column width={5}>

                        <Button primary circular disabled={chosenChatbot.isTraining} loading={chosenChatbot.isTraining} onClick={() => { this.SaveChatbotDatas(chosenChatbot, chatbotIndex) }} >
                            <Icon name='configure' />Start Training
                        </Button>

                        <Segment>Chatbot Testing</Segment>

                        <FooterForm placeholder='Check cb' formSubmit={(formvalue) => {
                            this.props.checkNLU(chosenChatbot.uuid, formvalue, (displayTmpJson) => {
                                this.setState({ displayTmpJson: displayTmpJson })
                            })
                        }} />

                        <ReactJson src={this.state.displayTmpJson} displayDataTypes={false} displayObjectSize={false}/>

                    </Grid.Column>

                </Grid>
            )
        }
        else {
            return (<div>loading chatbot info</div>)
        }

    }

}

export default DisplayChatbotPage
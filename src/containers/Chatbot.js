import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import ChatbotConsole from './components/ChatbotConsole'
import { Grid, Segment, Button } from 'semantic-ui-react'
import {
    chatbotEntitiesUpdate_act,
    chatbotIntentsUpdate_act,
    chatbotActionsUpdate_act,
    chatbotStoriesUpdate_act,
    SaveChatbotDatas_act
} from './actions/chatbotsActions'

class DisplayChatbotPage extends Component {

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
        // this is the chatbot that want to update the actions
        this.props.updateStories(this.props.match.params.topicId, stories)
    }

    convertToNluDataFormat = (intents, entities) => {

        let rasa_nlu_data = {
            common_examples: [],
            entity_synonyms: [],
            regex_features: []
        }

        // preparing entity_synonyms
        rasa_nlu_data.entity_synonyms = entities.map((entity, index) => {
            return {
                value: entity.value,
                synonyms: [...entity.synonyms]
            }
        })

        // preparing common_examples
        intents.forEach((intent) => {
            let intentName = intent.intent
            let entitiesToSearch = [...intent.entities]

            rasa_nlu_data.common_examples.push(...intent.texts.map((text)=>{

                let entitiesIn = []

                // find out all the synonyms first
                entitiesToSearch.forEach((entityToSearch, eindex)=>{
                    for(let i = 0; i < entities.length; ++i) {
                        if(entityToSearch === entities[i].value) {
                            const sns = entities[i].synonyms
                            sns.forEach((sn)=>{
                                let start = text.indexOf(sn)
                                if(start >= 0) {
                                    let end = start + sn.length
                                    entitiesIn.push({ start: start, end: end, value: sn, entity: entityToSearch} )
                                }
                            })
                        }
                    }
                })

                return {
                    text: text,
                    intent: intentName,
                    entities: entitiesIn
                }
            }))

        })

        console.log(rasa_nlu_data)
    }

    SaveChatbotDatas = (chosenChatbot) => {
        this.props.SaveChatbotDatas(chosenChatbot.uuid, {
            entities: chosenChatbot.entities,
            intents: chosenChatbot.intents,
            actions: chosenChatbot.actions,
            stories: chosenChatbot.stories
        })
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
                        <Button onClick={() => { this.SaveChatbotDatas(chosenChatbot); this.convertToNluDataFormat(chosenChatbot.intents, chosenChatbot.entities) }} />
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

    updateIntents = (cbindex, intents) => {
        // there is a chatbot want to update its intents
        this.props.dispatch(chatbotIntentsUpdate_act(cbindex, intents))
    }

    updateActions = (cbindex, actions) => {
        // there is a chatbot want to update its actions
        this.props.dispatch(chatbotActionsUpdate_act(cbindex, actions))
    }

    updateStories = (cbindex, stories) => {
        // there is a chatbot want to update its stories
        this.props.dispatch(chatbotStoriesUpdate_act(cbindex, stories))
    }

    SaveChatbotDatas = (cbuuid, cbdatas) => {
        const { jwt, backendUrl } = this.props
        this.props.dispatch(SaveChatbotDatas_act(backendUrl, cbuuid, cbdatas, jwt))
    }

    render() {
        return (
            <div>
                <Route 
                    path={`${this.props.match.url}/:topicId`} 
                    render= { 
                        props => <DisplayChatbotPage
                            {...props}
                            chatbotsReducer={this.props.chatbotsReducer}
                            updateEntities={this.updateEntities}
                            updateIntents={this.updateIntents}
                            updateActions={this.updateActions}
                            updateStories={this.updateStories}
                            SaveChatbotDatas={this.SaveChatbotDatas}
                        />
                    }
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
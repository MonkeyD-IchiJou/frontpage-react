import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import { Header, Divider, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class DisplayCbQueryRes extends Component {
    render() {
        const { uuid, displayTmpJson, chatbotInfo } = this.props
        let tracker = displayTmpJson[0]
        let AllActions = [...displayTmpJson]
        // i do not want the first item
        AllActions.splice(0, 1)

        let renderIntentRanking = ''
        let renderChosenIntent = ''
        let renderEntities = ''
        let renderSenderID = ''

        if(tracker) {

            // search the index of the chosen Intent
            let chosenIntentName = tracker.latest_message.intent.name
            let ii = 0
            chatbotInfo.intents.forEach((intent, index)=>{
                if(intent.intent === chosenIntentName) {
                    ii = index
                }
            })

            renderChosenIntent = (
                <Segment>
                    <Header>Predicted Intent</Header>
                    <h5><Link to={"/console/chatbot/" + uuid + "/Trainings/Intents/" + ii}>{chosenIntentName}</Link></h5>
                    <ReactJson src={tracker.latest_message.intent} displayDataTypes={false} displayObjectSize={false} />
                </Segment>
            )

            renderEntities = (
                <Segment>
                    <Header>Extracted Entities</Header>
                    <ReactJson src={tracker.latest_message.entities} displayDataTypes={false} displayObjectSize={false} />
                </Segment>
            )

            renderSenderID = (
                <Segment>
                    <Header>Sender ID</Header>
                    {tracker.sender_id}
                    <Header>Text Sent</Header>
                    {tracker.latest_message.text}
                </Segment>
            )

            renderIntentRanking = (
                <Segment>
                    <Header>Intent Ranking</Header>
                    <ReactJson src={tracker.latest_message.intent_ranking} displayDataTypes={false} displayObjectSize={false} />
                </Segment>
            )

        }

        return(
            <div>
                <Divider hidden={true}/>
                {renderSenderID}
                {renderChosenIntent}
                {renderEntities}
                {
                    AllActions.map((eaction, index) => {
                        let ai = 0
                        chatbotInfo.actions.forEach((action, index) => {
                            if (action.name === eaction.actionName) {
                                ai = index
                            }
                        })
                        return (
                            <Segment key={index}>
                                <Header>Chatbot Action {index + 1}</Header>
                                <h5><Link to={"/console/chatbot/" + uuid + "/Trainings/Actions/" + ai}>{eaction.actionName}</Link></h5>
                                < ReactJson src={eaction.actionsExecuted} displayDataTypes={false} displayObjectSize={false} />
                            </Segment>
                        )
                    })
                }
                {renderIntentRanking}
            </div>
        )
    }
}

export default DisplayCbQueryRes
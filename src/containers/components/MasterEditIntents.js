import React, { Component } from 'react'
import EditIntent from './EditIntent'

class MasterEditIntents extends Component {
    render() {
        const { cbIntents, cbEntities, updateIntents, match } = this.props

        let intents = JSON.parse(JSON.stringify(cbIntents))
        let index = match.params.topicId
        let intent = intents[match.params.topicId]

        return (
            <EditIntent
                intent={intent}
                availableEntities={cbEntities}
                updateIntents={(newIntent) => {
                    // update this specific intent
                    intents[index] = newIntent
                    // then update my redux store
                    updateIntents(intents)
                }}
            />
        )
    }
}

export default MasterEditIntents
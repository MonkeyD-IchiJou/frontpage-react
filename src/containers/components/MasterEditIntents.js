import React, { Component } from 'react'
import EditIntent from './EditIntent'

class MasterEditIntents extends Component {
    render() {
        const { cbIntents, cbEntities, updateIntents, match } = this.props
        let index = match.params.topicId

        return (
            <EditIntent
                intent={cbIntents[index]}
                availableEntities={cbEntities}
                updateIntents={(newIntent) => {
                    // deep clone first
                    let intents = JSON.parse(JSON.stringify(cbIntents))
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
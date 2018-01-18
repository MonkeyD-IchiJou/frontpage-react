import React, { Component } from 'react'
import EditAction from './EditAction'

class MasterEditAction extends Component {

    render() {

        const { cbActions, match, updateActions } = this.props

        // deep clone this all actions
        let actions = JSON.parse(JSON.stringify(cbActions))

        // get the index of the action i want to edit
        let index = match.params.topicId

        // get the hold of the chosen action
        let action = actions[match.params.topicId]

        return (
            <EditAction
                action={action}
                updateActions={(newAction) => {
                    actions[index] = newAction
                    updateActions(actions)
                }}
            />
        )
    }

}

export default MasterEditAction
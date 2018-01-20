import React, { Component } from 'react'
import EditAction from './EditAction'

class MasterEditAction extends Component {

    render() {

        const { cbActions, match, updateActions } = this.props
        let index = match.params.topicId

        return (
            <EditAction
                action={cbActions[index]}
                updateActions={(newAction) => {
                    // deep clone this all actions
                    let actions = JSON.parse(JSON.stringify(cbActions))
                    actions[index] = newAction
                    updateActions(actions)
                }}
            />
        )
    }

}

export default MasterEditAction
import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class ResponseLink extends Component {

    render() {
        let action = JSON.parse(JSON.stringify(this.props.action))
        return (
            <Input value={action.link} fluid onChange={(event, data) => {
                action.link = data.value
                this.props.updateAction(action)
            }} />
        )
    }
}

export default ResponseLink
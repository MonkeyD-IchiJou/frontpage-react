import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class ResponseText extends Component {

    render () {
        let action = JSON.parse(JSON.stringify(this.props.action))
        return (
            <Input value={action.text} fluid onChange={(event, data) => {
                action.text = data.value
                this.props.updateAction(action)
            }} />
        )
    }
}

export default ResponseText
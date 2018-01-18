import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class ProgressSave extends Component {
    render() {

        const { clickDone } = this.props

        return (
            <Button onClick={() => { clickDone() }} icon='save' basic floated="right"/>
        )
    }
}

export default ProgressSave
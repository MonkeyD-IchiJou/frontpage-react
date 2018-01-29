import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class ProgressSave extends Component {
    render() {

        const { clickDone, hasSaved } = this.props

        let iconcorner = 'checkmark'
        if(!hasSaved) {
            iconcorner = 'remove'
        }

        return (
            <Button onClick={() => { clickDone() }} basic positive={hasSaved} negative={!hasSaved} floated="right">
                <Icon.Group size='large'>
                    <Icon name='save' />
                    <Icon corner name={iconcorner} />
                </Icon.Group>
            </Button>
        )
    }
}

export default ProgressSave
import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class ModalActions extends Component {
    render() {

        const { clickDone, clickCancel } = this.props

        return (
            <div>
                <Button color={'green'} onClick={() => { clickDone() }}>
                    <Icon name='checkmark' /> Done
                </Button>
                <Button onClick={() => { clickCancel() }}><Icon name='close' />Cancel</Button>
            </div>
        )
    }
}

export default ModalActions
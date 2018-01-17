import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class ModalActions extends Component {
    render() {

        const { clickDone, clickCancel } = this.props

        return [
            <Button color={'green'} onClick={() => { clickDone() }} key={1}>
                <Icon name='checkmark' /> Done
            </Button>,
            <Button key={2} onClick={() => { clickCancel() }}><Icon name='close' />Cancel</Button>
        ]
    }
}

export default ModalActions
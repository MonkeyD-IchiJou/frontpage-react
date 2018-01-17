import React, { Component } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'

class ConfirmRemove extends Component {
    state = { open: false }

    show = () => this.setState({ open: true })

    handleConfirm = () => {
        this.props.confirmAction()
        this.setState({ open: false })
    }

    handleCancel = () => this.setState({ open: false })

    render() {
        return (
            <div>
                <Button icon basic negative floated='right' size='mini' onClick={this.show}>
                    <Icon name='minus' />
                </Button>
                <Confirm
                    header='Warning'
                    content='Are you sure to remove this'
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

export default ConfirmRemove
import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmDelete extends Component {
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
        <Button negative onClick={this.show} floated={'right'}>
          Delete Chatbot
        </Button>
        <Confirm
          header='Warning'
          content='Are you sure to delete this chatbot?!'
          open={this.state.open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default ConfirmDelete
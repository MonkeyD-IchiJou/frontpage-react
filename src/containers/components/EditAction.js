import React, { Component } from 'react'
import ModalActions from './ModalActions'
import { Modal, Button, Icon, Header } from 'semantic-ui-react'

class EditAction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false
        }
    }

    resetState = () => {
        this.setState({
            modalOpen: false
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        return(
            <Modal
                trigger={
                    < Button icon basic floated='right' size='small' primary onClick={this.handleOpen} >
                        <Icon name='write' />
                    </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeOnDimmerClick={false}
            >

                <Modal.Content>
                    <Header>Action Name</Header>
                </Modal.Content>

                <Modal.Actions>
                    <ModalActions 
                        clickDone={()=>{
                            this.setState({ modalOpen: false })
                        }}
                        clickCancel={()=>{
                            this.resetState()
                        }}
                    />
                </Modal.Actions>

            </Modal>
        )
    }
}

export default EditAction
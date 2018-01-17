import React, { Component } from 'react'
import ModalActions from './ModalActions'
import { Modal, Button, Icon, Header, Input, Segment, Label, Popup } from 'semantic-ui-react'

class EditAction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            actionName: this.props.action.name,
            allActions: JSON.parse(JSON.stringify(this.props.action.allActions))
        }
    }

    resetState = () => {
        this.setState({
            modalOpen: false,
            actionName: this.props.action.name,
            allActions: JSON.parse(JSON.stringify(this.props.action.allActions))
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {

        let { actionName, allActions } = this.state

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

                    <Input value={actionName} fluid onChange={(event, data) => {
                        this.setState({ actionName: data.value })
                    }} />

                    <Header>Actions</Header>

                    {allActions.map((actions, index)=>{
                        return (
                            <Segment key={index}>
                                <Label attached='top'>
                                    <Popup
                                        trigger={
                                            <Icon name='close' color='red' onClick={() => { 
                                                allActions.splice(index, 1)
                                                this.setState({ allActions: allActions })
                                            }}/>
                                        }
                                        content='Remove Action'
                                    />
                                </Label>
                                {actions.map((action, aindex)=>{
                                    return (
                                        <Segment key={aindex}>
                                            daf
                                        </Segment>
                                    )
                                })}
                            </Segment>
                        )
                    })}

                    <Button primary onClick={()=>{
                        allActions.push([{text: 'default'}])
                        this.setState({ allActions: allActions })
                    }}>
                        <Icon name='plus'/>Create New Action
                    </Button>

                </Modal.Content>

                <Modal.Actions>
                    <ModalActions 
                        clickDone={()=>{
                            this.props.updateActions({ name: actionName, allActions: allActions })
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
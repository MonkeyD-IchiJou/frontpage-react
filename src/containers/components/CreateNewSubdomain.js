import React, { Component } from 'react'
import { Button, Icon, Modal, Header, Input } from 'semantic-ui-react'

class CreateNewSubdomain extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            subdomainName: ''
        }
    }

    render() {
        const { selectedSubdomains, createNew, removeSubdomain } = this.props
        const { modalOpen, subdomainName } = this.state

        return(
            <Button.Group>

                <Modal
                    trigger={
                        <Button icon primary onClick={() => {
                            this.setState({ modalOpen: true })
                        }}>
                            <Icon name='plus' />
                        </Button>
                    }
                    closeOnDimmerClick={false}
                    open={modalOpen}
                >

                    <Modal.Header>Create a new SubDomain</Modal.Header>

                    <Modal.Content>
                        <Modal.Description>
                            <Header>Enter Subdomain Name</Header>
                            <Input value={subdomainName} fluid onChange={(event, data) => {
                                this.setState({ subdomainName: data.value })
                            }} />
                        </Modal.Description>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button basic color='red' onClick={() => {
                            this.setState({ modalOpen: false, subdomainName: '' })
                        }}>
                            <Icon name='remove' /> No
                        </Button>
                        <Button color='green' onClick={() => {
                            if (subdomainName) {
                                createNew(subdomainName)
                            }
                            this.setState({ modalOpen: false, subdomainName: '' })
                        }}>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>

                </Modal>

                <Button icon disabled={selectedSubdomains === 'Main'} onClick={()=>{
                    removeSubdomain(selectedSubdomains)
                }}>
                    <Icon name='minus' />
                </Button>

            </Button.Group>
        )
    }

}

export default CreateNewSubdomain

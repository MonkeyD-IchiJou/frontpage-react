import React, { Component } from 'react'
import Entity from './../../classes/Entity'
import { Icon, Button, Modal, Input, Header, Grid, Table } from 'semantic-ui-react'

class EditEntity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            value: this.props.entity.value,
            synonyms: [...this.props.entity.synonyms]
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {

        let value = this.state.value
        let synonyms = [...this.state.synonyms]

        return(
            <Modal
                trigger={
                    <Button icon basic floated='right' size='small' primary onClick={this.handleOpen}>
                        <Icon name='write' />
                    </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeOnDimmerClick={false}
            >
                <Modal.Header>Edit Entity</Modal.Header>

                <Modal.Content>
                    <Grid columns='equal'>

                        <Grid.Column>
                            <Header>Value</Header>
                            <Input value={value} onChange={(event, data)=>{
                                this.setState({value: data.value})
                            }}/>
                        </Grid.Column>

                        <Grid.Column>

                            <Header>Synonyms</Header>

                            <Table striped selectable>

                                <Table.Body>

                                    {synonyms.map((synonym, index)=> {
                                        return (
                                            <Table.Row key={index}>

                                                <Table.Cell>
                                                    <Input value={synonym} onChange={(event, data) => {
                                                        // update this new synonym
                                                        synonyms[index] = data.value
                                                        this.setState({ synonyms: synonyms })
                                                    }} />
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <Button icon basic floated='right' size='mini' negative onClick={()=>{
                                                        // delete this synonym
                                                        synonyms.splice(index, 1)
                                                        this.setState({ synonyms: synonyms })
                                                    }}>
                                                        <Icon name='minus' />
                                                    </Button>
                                                </Table.Cell>

                                            </Table.Row>
                                        )
                                    })}

                                </Table.Body>

                                <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='2'>
                                            <Button icon='plus' floated='right' primary compact content='new' position='top right' onClick={() => {
                                                // add a new synonym
                                                synonyms.push('default')
                                                this.setState({ synonyms: synonyms })
                                            }}/>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>

                            </Table>

                        </Grid.Column>

                    </Grid>
                </Modal.Content>

                <Modal.Actions>

                    <Button color={'green'} onClick={()=>{
                        // update the entity to my redux store
                        this.props.updateEntity(new Entity(value, synonyms))
                        this.setState({modalOpen: false})
                    }}>
                        <Icon name='checkmark' /> Done
                    </Button>

                    <Button onClick={()=>{
                        // go back to default state
                        this.setState({
                            modalOpen: false,
                            value: this.props.entity.value,
                            synonyms: [...this.props.entity.synonyms]
                        })
                    }}>
                        <Icon name='close' /> Cancel
                    </Button>

                </Modal.Actions>

            </Modal>
        )
    }
}

export default EditEntity
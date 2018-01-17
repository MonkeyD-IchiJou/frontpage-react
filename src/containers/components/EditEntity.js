import React, { Component } from 'react'
import Entity from './../../classes/Entity'
import ModalActions from './ModalActions'
import { Icon, Button, Modal, Input, Header, Grid, Table, Form } from 'semantic-ui-react'

class EditEntity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            value: this.props.entity.value,
            synonyms: JSON.parse(JSON.stringify(this.props.entity.synonyms)),
            newsynonym: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            modalOpen: false,
            value: nextProps.entity.value,
            synonyms: JSON.parse(JSON.stringify(nextProps.entity.synonyms)),
            newsynonym: ''
        })
    }

    resetState = () => {
        this.setState({
            modalOpen: false,
            value: this.props.entity.value,
            synonyms: JSON.parse(JSON.stringify(this.props.entity.synonyms)),
            newsynonym: ''
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        let value = this.state.value
        let synonyms = [...this.state.synonyms]
        let newsynonym = this.state.newsynonym

        return(
            <Modal
                trigger={
                    <div>
                        <Header style={{ padding: '5px', paddingBottom: '10px', cursor: 'pointer' }} onClick={this.handleOpen}>{value}</Header>
                    </div>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeOnDimmerClick={false}
            >
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
                                            <Form onSubmit={() => {
                                                // add a new synonym
                                                synonyms.push(newsynonym)
                                                this.setState({ synonyms: synonyms, newsynonym: '' })
                                            }}>
                                                <Form.Input placeholder='Create New Synonym' name='newsynonym' value={newsynonym} onChange={this.handleChange} />
                                            </Form>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>

                            </Table>

                        </Grid.Column>

                    </Grid>
                </Modal.Content>

                <Modal.Actions>
                    <ModalActions
                        clickDone={() => {
                            this.props.updateEntity(new Entity(value, synonyms))
                            this.setState({ modalOpen: false })
                        }}
                        clickCancel={() => {
                            this.resetState()
                        }}
                    />
                </Modal.Actions>

            </Modal>
        )
    }
}

export default EditEntity
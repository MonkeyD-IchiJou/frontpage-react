import React, { Component } from 'react'
import Entity from './../classes/Entity'
import ProgressSave from './ProgressSave'
import { Prompt } from 'react-router-dom'
import { Icon, Button, Input, Header, Grid, Table, Form } from 'semantic-ui-react'

class EditEntity extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: '',
            synonyms: [],
            newsynonym: '',
            hasSaved: true
        }

        if (this.props.entity) {
            this.state = {
                value: this.props.entity.value,
                synonyms: JSON.parse(JSON.stringify(this.props.entity.synonyms)),
                newsynonym: '',
                hasSaved: true
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.entity) {
            this.setState({
                value: nextProps.entity.value,
                synonyms: JSON.parse(JSON.stringify(nextProps.entity.synonyms)),
                newsynonym: '',
                hasSaved: true
            })
        }
    }

    editChanges = (states) => {
        this.setState({...states, hasSaved: false})
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        let { value, synonyms, newsynonym, hasSaved } = this.state

        return(
            <div style={{ padding: '10px' }}>

                <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

                <ProgressSave
                    clickDone={() => {
                        this.setState({hasSaved: true})
                        this.props.updateEntities(new Entity(value, synonyms))
                    }}
                />

                <Grid columns='equal' stackable>

                    <Grid.Column>
                        <Header>Value</Header>
                        <Input value={value} onChange={(event, data) => {
                            this.editChanges({ value: data.value })
                        }} />
                    </Grid.Column>

                    <Grid.Column>

                        <Header>Synonyms</Header>

                        <Table striped selectable>

                            <Table.Body>
                                {synonyms.map((synonym, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>
                                                <Input value={synonym} onChange={(event, data) => {
                                                    // update this new synonym
                                                    synonyms[index] = data.value
                                                    this.editChanges({ synonyms: synonyms })
                                                }} />
                                                <Button icon basic floated='right' size='mini' negative onClick={() => {
                                                    // delete this synonym
                                                    synonyms.splice(index, 1)
                                                    this.editChanges({ synonyms: synonyms })
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
                                    <Table.HeaderCell>
                                        <Form onSubmit={() => {
                                            // add a new synonym
                                            synonyms.push(newsynonym)
                                            this.editChanges({ synonyms: synonyms, newsynonym: '' })
                                        }}>
                                            <Form.Input placeholder='Create New Synonym' name='newsynonym' value={newsynonym} onChange={this.handleChange} />
                                        </Form>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>

                        </Table>

                    </Grid.Column>

                </Grid>

            </div>
        )
    }
}

export default EditEntity
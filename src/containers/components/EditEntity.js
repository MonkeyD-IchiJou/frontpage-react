import React, { Component } from 'react'
import Entity from './../classes/Entity'
import ProgressSave from './ProgressSave'
import { Icon, Button, Input, Header, Grid, Table, Form } from 'semantic-ui-react'

class EditEntity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.entity.value,
            synonyms: JSON.parse(JSON.stringify(this.props.entity.synonyms)),
            newsynonym: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            value: nextProps.entity.value,
            synonyms: JSON.parse(JSON.stringify(nextProps.entity.synonyms)),
            newsynonym: ''
        })
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        let { value, synonyms, newsynonym } = this.state

        return(
            <div style={{ padding: '10px' }}>

                <ProgressSave
                    clickDone={() => {
                        this.props.updateEntities(new Entity(value, synonyms))
                    }}
                />

                <Grid columns='equal' stackable>

                    <Grid.Column>
                        <Header>Value</Header>
                        <Input value={value} onChange={(event, data) => {
                            this.setState({ value: data.value })
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
                                                    this.setState({ synonyms: synonyms })
                                                }} />
                                                <Button icon basic floated='right' size='mini' negative onClick={() => {
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
                                    <Table.HeaderCell>
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

            </div>
        )
    }
}

export default EditEntity
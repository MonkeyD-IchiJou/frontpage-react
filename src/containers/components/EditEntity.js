import React, { Component } from 'react'
import Entity from './../classes/Entity'
import ProgressSave from './ProgressSave'
import { Prompt } from 'react-router-dom'
import EditEntityValue from './EditEntityValue'
import { Input, Header } from 'semantic-ui-react'

class EditEntity extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            values: [],
            hasSaved: true
        }

        if (this.props.entity) {
            this.state = {
                name: this.props.entity.name,
                values: JSON.parse(JSON.stringify(this.props.entity.values)),
                hasSaved: true
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.entity) {
            this.setState({
                value: nextProps.entity.name,
                synonyms: JSON.parse(JSON.stringify(nextProps.entity.values)),
                hasSaved: true
            })
        }
    }

    editChanges = (states) => {
        this.setState({...states, hasSaved: false})
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        let { name, values, hasSaved } = this.state

        return(
            <div style={{ padding: '10px' }}>

                <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

                <ProgressSave
                    clickDone={() => {
                        this.setState({hasSaved: true})
                        this.props.updateEntities(new Entity(name, values))
                    }}
                />

                <Header>Name</Header>

                <Input fluid value={name} onChange={(event, data) => {
                    this.editChanges({ name: data.value })
                }} />

                <Header>Values</Header>

                {
                    values.map((value)=>{
                        return <EditEntityValue value={value} />
                    })
                }

            </div>
        )
    }
}

export default EditEntity


/**
 * {synonyms.map((synonym, index) => {
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

    <Form onSubmit={() => {
        // add a new synonym
        synonyms.push(newsynonym)
        this.editChanges({ synonyms: synonyms, newsynonym: '' })
    }}>
        <Form.Input placeholder='Create New Synonym' name='newsynonym' value={newsynonym} onChange={this.handleChange} />
    </Form>
 */
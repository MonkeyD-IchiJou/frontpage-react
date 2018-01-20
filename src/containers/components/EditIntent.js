import React, { Component } from 'react'
import Intent from './../classes/Intent'
import ProgressSave from './ProgressSave'
import Highlighter from 'react-highlight-words'
import { Prompt } from 'react-router-dom'
import { Icon, Button, Input, Header, Table, Accordion, Form, Dropdown } from 'semantic-ui-react'

class EditIntent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            intent: '',
            entities: [],
            texts: [],
            activeIndex: -1,
            newusersay: '',
            hasSaved: true
        }

        if(this.props.intent) {
            this.state = {
                intent: this.props.intent.intent,
                entities: JSON.parse(JSON.stringify(this.props.intent.entities)),
                texts: JSON.parse(JSON.stringify(this.props.intent.texts)),
                activeIndex: -1,
                newusersay: '',
                hasSaved: true
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.intent) {
            this.setState({
                intent: nextProps.intent.intent,
                entities: JSON.parse(JSON.stringify(nextProps.intent.entities)),
                texts: JSON.parse(JSON.stringify(nextProps.intent.texts)),
                activeIndex: -1,
                newusersay: '',
                hasSaved: true
            })
        }
    }

    editChanges = (states) => {
        this.setState({ ...states, hasSaved: false })
    }

    // for accordian
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    // for create intent form
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        let { intent, entities, texts, activeIndex, newusersay, hasSaved } = this.state

        // all the available entities in this chatbot
        const availableEntities = this.props.availableEntities
        let availableEntitiesValue = []
        let allsynonyms = []

        if (availableEntities) {

            // simple mapping value only
            availableEntitiesValue = availableEntities.map((val, index) => {
                return { text: val.value, value: val.value }
            })

            // for highlighting words
            entities.forEach((entity, index) => {
                availableEntities.forEach((ae, aindex) => {
                    if (ae.value === entity) {
                        allsynonyms.push(...ae.synonyms)
                    }
                })
            })
    
        }

        return (
            <div style={{ padding: '10px' }}>

                <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

                <ProgressSave
                    clickDone={() => {
                        this.props.updateIntents(new Intent(intent, entities, texts))
                    }}
                />

                <Header>Intent Name</Header>

                <Input value={intent} fluid onChange={(event, data) => {
                    this.editChanges({ intent: data.value })
                }} />

                <Header>Associate Entities</Header>

                <Dropdown
                    value={entities}
                    placeholder='Select Entity'
                    fluid
                    search
                    multiple
                    selection
                    options={availableEntitiesValue}
                    onChange={(e, { value }) => {
                        this.editChanges({ entities: value })
                    }}
                />

                <Header>Common Examples</Header>

                <Table striped selectable>

                    <Table.Body>
                        {texts.map((text, index)=>{
                            return (
                                <Table.Row key={index}>

                                    <Table.Cell>
                                        <Accordion>
                                            <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                                                <Highlighter
                                                    searchWords={allsynonyms}
                                                    autoEscape={true}
                                                    textToHighlight={text}
                                                    caseSensitive={true}
                                                />
                                            </Accordion.Title>
                                            <Accordion.Content active={activeIndex === index}>
                                                <Input value={text} onChange={(event, data) => {
                                                    // update this new usersay example
                                                    texts[index] = data.value
                                                    this.editChanges({texts: texts})
                                                }} fluid/>
                                            </Accordion.Content>
                                        </Accordion>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Button icon basic floated='right' size='mini' negative onClick={() => {
                                            // delete this example
                                            texts.splice(index, 1)
                                            this.editChanges({ texts: texts })
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
                                    texts.push(newusersay)
                                    this.editChanges({ texts: texts, newusersay: '' })
                                }}>
                                    <Form.Input required placeholder='Create New Example' name='newusersay' value={newusersay} onChange={this.handleChange} />
                                </Form>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table>

            </div>
        )
    }
    
}

export default EditIntent
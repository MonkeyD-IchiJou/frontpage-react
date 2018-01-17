import React, { Component } from 'react'
import Intent from './../../classes/Intent'
import { Icon, Button, Modal, Input, Header, Table, Accordion, Form, Dropdown } from 'semantic-ui-react'
import Highlighter from 'react-highlight-words'

class EditIntent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            intent: this.props.intent.intent,
            entities: JSON.parse(JSON.stringify(this.props.intent.entities)),
            texts: JSON.parse(JSON.stringify(this.props.intent.texts)),
            activeIndex: -1,
            newusersay: ''
        }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        let { intent, entities, texts, activeIndex, newusersay } = this.state

        const availableEntities = this.props.availableEntities

        let availableEntitiesValue = availableEntities.map((val, index) => {
            return { text: val.value, value: val.value }
        })

        let allsynonyms = []
        entities.forEach((entity, index)=>{
            availableEntities.forEach((ae, aindex)=>{
                if(ae.value === entity) {
                    allsynonyms.push(...ae.synonyms)
                }
            })
        })

        return (
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

                    <Header>Intent Name</Header>

                    <Input value={intent} fluid onChange={(event, data) => {
                        this.setState({ intent: data.value })
                    }} />

                    <Header>Associate Entities</Header>

                    <Table striped selectable>

                        <Table.Body>
                            <Table.Row>

                                <Table.Cell>
                                    <Dropdown
                                        value={entities}
                                        placeholder='Select Entity'
                                        fluid
                                        search
                                        multiple
                                        selection
                                        options={availableEntitiesValue}
                                        onChange={(e, { value }) => {
                                            this.setState({ entities: value })
                                        }}
                                    />
                                </Table.Cell>

                            </Table.Row>
                        </Table.Body>

                    </Table>

                    <Header>Common Examples</Header>

                    <Table striped selectable>

                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>
                                    <Form onSubmit={() => {
                                        texts.push(newusersay)
                                        this.setState({ texts: texts, newusersay: '' })
                                    }}>
                                        <Form.Input placeholder='Create New Example' name='newusersay' value={newusersay} onChange={this.handleChange} />
                                    </Form>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

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
                                                        this.setState({texts: texts})
                                                    }} fluid/>
                                                </Accordion.Content>
                                            </Accordion>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Button icon basic floated='right' size='mini' negative onClick={() => {
                                                // delete this synonym
                                                texts.splice(index, 1)
                                                this.setState({ texts: texts })
                                            }}>
                                                <Icon name='minus' />
                                            </Button>
                                        </Table.Cell>

                                    </Table.Row>
                                )
                            })}
                        </Table.Body>

                    </Table>

                </Modal.Content>

                <Modal.Actions>

                    <Button color={'green'} onClick={() => {
                        // update the entity to my redux store
                        this.props.updateIntent(new Intent(intent, entities, texts))
                        this.setState({ modalOpen: false })
                    }}>
                        <Icon name='checkmark' /> Done
                    </Button>

                    <Button onClick={() => {
                        // go back to default state
                        this.setState({
                            modalOpen: false,
                            intent: this.props.intent.intent,
                            entities: JSON.parse(JSON.stringify(this.props.intent.entities)),
                            texts: JSON.parse(JSON.stringify(this.props.intent.texts)),
                            activeIndex: -1,
                            newusersay: ''
                        })
                    }}>
                        <Icon name='close' /> Cancel
                    </Button>

                </Modal.Actions>

            </Modal>
        )
    }
    
}

export default EditIntent

/*
<EditIntentEntities text={usersay.text} entities={usersay.entities} updateEntities={(entities)=>{
    usersays[index].entities = entities
    this.setState({ usersays: usersays })
}}/>
*/
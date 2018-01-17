import React, { Component } from 'react'
import Intent from './../../classes/Intent'
import ModalActions from './ModalActions'
import ConfirmRemove from './ConfirmRemove'
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

    resetState = () => {
        this.setState({
            modalOpen: false,
            intent: this.props.intent.intent,
            entities: JSON.parse(JSON.stringify(this.props.intent.entities)),
            texts: JSON.parse(JSON.stringify(this.props.intent.texts)),
            activeIndex: -1,
            newusersay: ''
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            modalOpen: false,
            intent: nextProps.intent.intent,
            entities: JSON.parse(JSON.stringify(nextProps.intent.entities)),
            texts: JSON.parse(JSON.stringify(nextProps.intent.texts)),
            activeIndex: -1,
            newusersay: ''
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

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

        let { intent, entities, texts, activeIndex, newusersay } = this.state

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
            <Modal
                trigger={
                    <div>
                        <ConfirmRemove confirmAction={() => { this.props.removeIntents() }} />
                        <span style={{ cursor: 'pointer' }} onClick={this.handleOpen}>{intent}</span>
                    </div>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeOnDimmerClick={false}
                size="large"
            >
                <Modal.Content scrolling>

                    <Header>Intent Name</Header>

                    <Input value={intent} fluid onChange={(event, data) => {
                        this.setState({ intent: data.value })
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
                            this.setState({ entities: value })
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
                                                        this.setState({texts: texts})
                                                    }} fluid/>
                                                </Accordion.Content>
                                            </Accordion>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Button icon basic floated='right' size='mini' negative onClick={() => {
                                                // delete this example
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

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>
                                    <Form onSubmit={() => {
                                        texts.push(newusersay)
                                        this.setState({ texts: texts, newusersay: '' })
                                    }}>
                                        <Form.Input required placeholder='Create New Example' name='newusersay' value={newusersay} onChange={this.handleChange} />
                                    </Form>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>

                    </Table>

                </Modal.Content>

                <Modal.Actions>
                    <ModalActions
                        clickDone={() => {
                            this.props.updateIntent(new Intent(intent, entities, texts))
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

export default EditIntent
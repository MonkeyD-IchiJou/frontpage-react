import React, { Component } from 'react'
import { Segment, Button, Table, Header, Popup, Divider } from 'semantic-ui-react'

class CbDashboard extends Component {
    render() {

        const chatbotsReducer = this.props.chatbotsReducer
        const listChatbots = chatbotsReducer.map((chatbot) =>
            <Table.Row key={chatbot.uuid} textAlign='center'>
                <Table.Cell selectable>
                    <a href='/homepage/console'>{chatbot.name}</a>
                </Table.Cell>
                <Table.Cell selectable>
                    <a href='/homepage/console'>{chatbot.description}</a>
                </Table.Cell>
            </Table.Row>
        )
        return (
            <Segment>

                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'><Header>Chatbots</Header></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {listChatbots}

                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                <Popup
                                    trigger={<Button icon='plus' floated='right' primary compact/>}
                                    content='Create new chatbot project'
                                    position='top right'
                                />
                                <Divider hidden/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table>

            </Segment>
        )
    }
}

export default CbDashboard
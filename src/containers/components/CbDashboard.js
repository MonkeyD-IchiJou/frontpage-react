import React, { Component } from 'react'
import { Segment, Button, Table, Header, Popup, Divider } from 'semantic-ui-react'

class CbDashboard extends Component {
    render() {

        const chatbotsReducer = this.props.chatbotsReducer
        const listChatbots = chatbotsReducer.map((chatbot, index) =>
            <Table.Row key={index}>
                <Table.Cell>
                    <a href={'/homepage/console/chatbot/' + chatbot.uuid}>{chatbot.name}</a>
                </Table.Cell>
                <Table.Cell>
                    {chatbot.description}
                </Table.Cell>
            </Table.Row>
        )
        return (
            <Segment>

                <Header>Chatbot Projects</Header>

                <Table striped selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Header>name</Header></Table.HeaderCell>
                            <Table.HeaderCell><Header>description</Header></Table.HeaderCell>
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
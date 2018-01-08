import React, { Component } from 'react'
import { Segment, Button, Table, Header, Popup, Divider } from 'semantic-ui-react'

class LcDashboard extends Component {
    render() {
        const livechatsReducer = this.props.livechatsReducer
        let listLivechats = ''
        if (livechatsReducer) {
            listLivechats = livechatsReducer.map((livechat) =>
                <Table.Row key={livechat.uuid} textAlign='center'>
                    <Table.Cell selectable>
                        <a href={'/homepage/console/livechat/' + livechat.uuid}>{livechat.name}</a>
                    </Table.Cell>
                    <Table.Cell selectable>
                        <a href={'/homepage/console/livechat/' + livechat.uuid}>{livechat.description}</a>
                    </Table.Cell>
                </Table.Row>
            )
        }

        return (
            <Segment>

                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'><Header>Livechats</Header></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {listLivechats}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                <Popup
                                    trigger={<Button icon='plus' floated='right' primary compact />}
                                    content='Create new livechat project'
                                    position='top right'
                                />
                                <Divider hidden />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table>

            </Segment>
        )
    }
}

export default LcDashboard
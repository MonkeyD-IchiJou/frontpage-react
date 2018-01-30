import React, { Component } from 'react'
import { Table, Button, Label, Popup } from 'semantic-ui-react'

class MonitorLivechat extends Component {
    render() {
        return(
            <Table celled unstackable selectable>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Client's Name</Table.HeaderCell>
                        <Table.HeaderCell>Problems Faced</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        this.props.clientOnlineLists.map((client, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        {client.clientName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {client.clientMsg}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {client.clientSocketId}
                                    </Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        <Popup
                                            trigger={<Label circular color={'green'} empty />}
                                            content='Available'
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        <Button primary icon='talk' onClick={()=>{
                                            this.props.selectCurrentClientToChatWith(index)
                                        }}/>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>

            </Table>
        )
    }
}

export default MonitorLivechat
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Table, Header } from 'semantic-ui-react'

class DisplayLivechat extends Component {
    render() {
        const livechatsReducer = this.props.livechatsReducer
        const livechatUUID = this.props.match.params.topicId
        let livechatInfo = {}

        for (let i = 0; i < livechatsReducer.length; ++i) {
            if (livechatsReducer[i].uuid === livechatUUID) {
                livechatInfo = livechatsReducer[i]
            }
        }

        let clientsList = ''
        if (livechatInfo.clientsList) {
            clientsList = livechatInfo.clientsList.map((clients) =>
                <Table.Row key={clients.clientSocketId}>
                    <Table.Cell>{clients.clientSocketId}</Table.Cell>
                    <Table.Cell>{clients.clientName}</Table.Cell>
                    <Table.Cell>{clients.clientMsg}</Table.Cell>
                </Table.Row>
            )
        }

        return(
            <div>
                <Header>Total clients online right now</Header>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Header>id</Header>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header>name</Header>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Header>problem</Header>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    {livechatInfo.clientsList && 
                        <Table.Body>
                            {clientsList}
                        </Table.Body>
                    }

                </Table>
            </div>
        )
    }
}

class Livechat extends Component {
    componentDidMount() {
        // change the header title to dashboard
        this.props.changeTitle('Livechat')
    }

    render() {
        return (
            <div>
                <Route
                    path={`${this.props.match.url}/:topicId`}
                    render={props => <DisplayLivechat {...props} livechatsReducer={this.props.livechatsReducer} />}
                />
            </div>
        )
    }
}

export default Livechat
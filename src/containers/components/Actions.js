import React, { Component } from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'

class Actions extends Component {

    constructor(props) {
        super(props)

        // init my state at the very begining
        this.state = {
            actions: this.props.cbActions
        }
    }

    render() {

        let displayActions = this.state.actions.map((action, index) => {
            return (
                <Table.Row key={index}>

                    <Table.Cell>
                        {action.name}
                    </Table.Cell>

                    <Table.Cell>
                        <Button icon basic floated='right' size='small'>
                            <Icon name='write' />
                        </Button>
                    </Table.Cell>

                </Table.Row>
            )
        })

        return (
            <Table selectable>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {displayActions}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='plus' /> Add Actions
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }

}

export default Actions
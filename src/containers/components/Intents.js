import React, { Component } from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'

class Intents extends Component {

    constructor(props) {
        super(props)

        // init my state at the very begining
        this.state = {
            intents: this.props.cbIntents
        }
    }

    render() {

        let displayIntents = this.state.intents.map((intent, index) => {
            return (
                <Table.Row key={index}>

                    <Table.Cell>
                        {intent.intent}
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
                        <Table.HeaderCell>Intents</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {displayIntents}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='plus' /> Add Intent
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }

}

export default Intents
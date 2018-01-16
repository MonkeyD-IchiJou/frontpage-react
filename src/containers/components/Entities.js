import React, { Component } from 'react'
import { Table, Label, Icon, Button } from 'semantic-ui-react'

class Entities extends Component {
    constructor(props) {
        super(props)

        // init my state at the very begining
        this.state = {
            entities: this.props.cbEntities
        }
    }

    render() {
        let displayEntities = this.state.entities.map((entity, index)=>{
            return(
                <Table.Row key={index}>

                    <Table.Cell>
                        {entity.value}
                    </Table.Cell>

                    <Table.Cell>

                        {entity.synonyms.map((synonym, index)=>{
                            return(
                                <Label key={index}>
                                    {synonym}
                                    <Icon name='delete' />
                                </Label>
                            )
                        })}

                    </Table.Cell>

                    <Table.Cell>
                        <Button icon basic floated='right' size='small'>
                            <Icon name='write' />
                        </Button>
                    </Table.Cell>

                </Table.Row>
            )
        })
        return(
            <Table selectable>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                        <Table.HeaderCell>Synonyms</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {displayEntities}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='plus' /> Add Entity
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }
}

export default Entities
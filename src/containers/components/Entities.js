import React, { Component } from 'react'
import EditEntity from './EditEntity'
import ConfirmRemove from './ConfirmRemove'
import Entity from './../../classes/Entity'
import { Table, Label, Icon, Button, Pagination } from 'semantic-ui-react'

class Entities extends Component {

    constructor(props) {
        super(props)
        this.state= {
            activePage: 1
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    render() {
        let entities = [...this.props.cbEntities]
        let updateEntities = this.props.updateEntities
        const { activePage } = this.state

        // first see how many pages
        let totalpages = Math.ceil(entities.length / 10.0)
        let displayPagination = ''
        if(totalpages > 1) {
            displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
        }

        const sliceStartId = (activePage - 1) * 10
        const sliceEndId = activePage * 10

        let displayEntities = entities.slice(sliceStartId, sliceEndId).map((entity, index)=>{
            // the real index
            index += sliceStartId
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
                                </Label>
                            )
                        })}
                    </Table.Cell>

                    <Table.Cell>
                        <ConfirmRemove confirmAction={()=>{
                            // remove this entity
                            entities.splice(index, 1)
                            // then update my redux store
                            updateEntities(entities)
                        }}/>
                        <EditEntity entity={entity} updateEntity={(newentity)=>{
                            // update this specific entity
                            entities[index] = newentity
                            // then update my redux store
                            updateEntities(entities)
                        }}/>
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
                            <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => {
                                // create a default new entity
                                entities.push(new Entity('Default', ['Default']))
                                // then update my redux store
                                updateEntities(entities)
                            }}>
                                <Icon name='plus' /> Add Entity
                            </Button>

                            {displayPagination}

                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }
}

export default Entities
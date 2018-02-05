import React, { Component } from 'react'
import Entity from './../classes/Entity'
import FooterForm from './FooterForm'
import ConfirmRemove from './ConfirmRemove'
import { Table, Pagination, Message } from 'semantic-ui-react'

class DisplayEntitiesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    render() {
        const { updateEntities, cbEntities, history, match, } = this.props
        let entities = JSON.parse(JSON.stringify(cbEntities))
        const { activePage } = this.state

        // first see how many pages
        let totalpages = Math.ceil(entities.length / 10.0)
        let displayPagination = ''
        if (totalpages > 1) {
            displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
        }

        const sliceStartId = (activePage - 1) * 10
        const sliceEndId = activePage * 10

        let EmptyEntitiesMsg = ''
        if (entities.length === 0) {
            EmptyEntitiesMsg = (
                <Message info>
                    <Message.Header>0 Entites Found</Message.Header>
                    <p>Create a new entity by submitting a form below</p>
                </Message>
            )
        }
        return (
            <div>
                {EmptyEntitiesMsg}
                <Table selectable>

                    <Table.Body>
                        {entities.slice(sliceStartId, sliceEndId).map((entity, index) => {
                            // the real index
                            index += sliceStartId
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <ConfirmRemove confirmAction={() => {
                                            // remove this entity
                                            entities.splice(index, 1)
                                            // then update my redux store
                                            updateEntities(entities)
                                        }} />
                                        <span style={{ cursor: 'pointer' }} onClick={() => { history.push(`${match.url}/${index}`) }}>{entity.name}</span>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>
                                <FooterForm placeholder='Create New Entity' formSubmit={(formvalue) => {
                                    entities.push(new Entity(formvalue, []))
                                    updateEntities(entities)
                                }} />
                                {displayPagination}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table>
            </div>
        )
    }
}

export default DisplayEntitiesTable
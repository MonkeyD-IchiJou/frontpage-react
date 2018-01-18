import React, { Component } from 'react'
import Entity from './../classes/Entity'
import FooterForm from './FooterForm'
import ConfirmRemove from './ConfirmRemove'
import { Table, Label, Pagination, Header } from 'semantic-ui-react'

class DisplayEntitiesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

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

        return (
            <Table selectable>

                <Table.Body>
                    {entities.slice(sliceStartId, sliceEndId).map((entity, index) => {
                        // the real index
                        index += sliceStartId
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <Header style={{ cursor: 'pointer' }} onClick={() => { history.push(`${match.url}/${index}`) }}>{entity.value}</Header>
                                    <ConfirmRemove confirmAction={() => {
                                        // remove this entity
                                        entities.splice(index, 1)
                                        // then update my redux store
                                        updateEntities(entities)
                                    }} />
                                    {entity.synonyms.map((synonym, index) => {
                                        return (
                                            <Label key={index}>
                                                {synonym}
                                            </Label>
                                        )
                                    })}
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
        )
    }
}

export default DisplayEntitiesTable
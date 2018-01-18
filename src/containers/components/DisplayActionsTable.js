import React, { Component } from 'react'
import Action from './../classes/Action'
import FooterForm from './FooterForm'
import ConfirmRemove from './ConfirmRemove'
import TextResponse from './../classes/TextResponse'
import { Table, Pagination } from 'semantic-ui-react'

class DisplayActionsTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    render() {

        // deep clone the actions
        // these are the one i want to display
        let actions = JSON.parse(JSON.stringify(this.props.cbActions))
        const { activePage } = this.state
        const { history, match, updateActions } = this.props

        // first see how many pages
        let totalpages = Math.ceil(actions.length / 10.0)
        let displayPagination = ''
        if (totalpages > 1) {
            displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
        }

        const sliceStartId = (activePage - 1) * 10
        const sliceEndId = activePage * 10

        return (
            <Table selectable>

                <Table.Body>
                    {actions.slice(sliceStartId, sliceEndId).map((action, index) => {
                        // the real index
                        index += sliceStartId
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <ConfirmRemove confirmAction={() => {
                                        actions.splice(index, 1)
                                        updateActions(actions)
                                    }} />
                                    <span style={{ cursor: 'pointer' }} onClick={() => { history.push(`${match.url}/${index}`) }}>{action.name}</span>
                                </Table.Cell >
                            </Table.Row>
                        )
                    })}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>
                            <FooterForm placeholder='Create New Action' formSubmit={(formvalue) => {
                                actions.push(new Action(formvalue, [[new TextResponse(formvalue)]]))
                                updateActions(actions)
                            }} />
                            {displayPagination}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }
}

export default DisplayActionsTable
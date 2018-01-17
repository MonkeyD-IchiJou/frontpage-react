import React, { Component } from 'react'
import Action from './../../classes/Action'
import EditAction from './EditAction'
import ConfirmRemove from './ConfirmRemove'
import FooterForm from './FooterForm'
import { Table, Pagination } from 'semantic-ui-react'

class Actions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    render() {

        // deep clone the actions
        let actions = JSON.parse(JSON.stringify(this.props.cbActions))
        let updateActions = this.props.updateActions
        const { activePage } = this.state

        // first see how many pages
        let totalpages = Math.ceil(actions.length / 10.0)
        let displayPagination = ''
        if (totalpages > 1) {
            displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
        }

        const sliceStartId = (activePage - 1) * 10
        const sliceEndId = activePage * 10

        let displayActions = actions.slice(sliceStartId, sliceEndId).map((action, index) => {
            // the real index
            index += sliceStartId
            return (
                <Table.Row key={index}>

                    <Table.Cell>
                        {action.name}
                    </Table.Cell>

                    <Table.Cell>

                        <ConfirmRemove confirmAction={() => {
                            // remove this intent
                            actions.splice(index, 1)
                            // then update my redux store
                            updateActions(actions)
                        }} />

                        <EditAction action={action}/>

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
                            <FooterForm placeholder='Create New Action' formSubmit={(formvalue)=>{
                                actions.push(new Action(formvalue, []))
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

export default Actions
import React, { Component } from 'react'
import Intent from './../../classes/Intent'
import EditIntent from './EditIntent'
import ConfirmRemove from './ConfirmRemove'
import FooterForm from './FooterForm'
import { Table, Pagination } from 'semantic-ui-react'

class Intents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        // deep clone the intents
        let intents = JSON.parse(JSON.stringify(this.props.cbIntents))
        let updateIntents = this.props.updateIntents
        const { activePage } = this.state

        // first see how many pages
        let totalpages = Math.ceil(intents.length / 10.0)
        let displayPagination = ''
        if (totalpages > 1) {
            displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
        }

        const sliceStartId = (activePage - 1) * 10
        const sliceEndId = activePage * 10

        let displayIntents = intents.slice(sliceStartId, sliceEndId).map((intent, index) => {
            // the real index
            index += sliceStartId
            return (
                <Table.Row key={index}>

                    <Table.Cell>
                        {intent.intent}
                    </Table.Cell>

                    <Table.Cell>

                        <ConfirmRemove confirmAction={() => {
                            // remove this intent
                            intents.splice(index, 1)
                            // then update my redux store
                            updateIntents(intents)
                        }}/>

                        <EditIntent intent={intent} availableEntities= {this.props.cbEntities} updateIntent={(newintent) => {
                            // update this specific intent
                            intents[index] = newintent
                            // then update my redux store
                            updateIntents(intents)
                        }} />

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
                            <FooterForm placeholder='Create New Intent' formSubmit={(formvalue) => {
                                intents.push(new Intent(formvalue, [], []))
                                updateIntents(intents)
                            }} />
                            {displayPagination}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }

}

export default Intents
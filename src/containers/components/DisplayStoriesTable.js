import React, { Component } from 'react'
import FooterForm from './FooterForm'
import ConfirmRemove from './ConfirmRemove'
import { Table, Pagination } from 'semantic-ui-react'
import Story from '../classes/Story'

class DisplayStoriesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    render() {

        let stories = JSON.parse(JSON.stringify(this.props.cbStories))
        const { activePage } = this.state
        const { history, match, updateStories } = this.props

        // first see how many pages
        let totalpages = Math.ceil(stories.length / 10.0)
        let displayPagination = ''
        if (totalpages > 1) {
            displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
        }

        const sliceStartId = (activePage - 1) * 10
        const sliceEndId = activePage * 10

        return (
            <Table selectable>

                <Table.Body>
                    {stories.slice(sliceStartId, sliceEndId).map((action, index) => {
                        // the real index
                        index += sliceStartId
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <ConfirmRemove confirmAction={() => {
                                        stories.splice(index, 1)
                                        updateStories(stories)
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
                            <FooterForm placeholder='Create New Story' formSubmit={(formvalue) => {
                                stories.push(new Story(formvalue, '', '', [], [], ''))
                                updateStories(stories)
                            }} />
                            {displayPagination}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }
}

export default DisplayStoriesTable
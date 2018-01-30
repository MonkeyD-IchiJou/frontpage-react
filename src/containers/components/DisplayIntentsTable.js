import React, { Component } from 'react'
import Intent from './../classes/Intent'
import FooterForm from './FooterForm'
import ConfirmRemove from './ConfirmRemove'
import { Table, Pagination, Checkbox, Dropdown } from 'semantic-ui-react'

class DisplayIntentsTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activePage: 1,
            allCheckedItems: []
        }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    PushCheckedItem = (itemName) => {
        this.setState({allCheckedItems: [...this.state.allCheckedItems, itemName]})
    }

    PopCheckedItem = (itemName) => {
        let newItemlist = []
        this.state.allCheckedItems.forEach((item)=>{
            if(item !== itemName) {
                newItemlist.push(item)
            }
        })
        this.setState({ allCheckedItems: newItemlist })
    }

    render() {

        const { updateIntents, cbIntents, history, match, } = this.props
        let intents = JSON.parse(JSON.stringify(cbIntents))
        const { activePage, allCheckedItems } = this.state

        // first see how many pages
        let totalpages = Math.ceil(intents.length / 10.0)
        let displayPagination = ''
        if (totalpages > 1) {
            displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
        }

        const sliceStartId = (activePage - 1) * 10
        const sliceEndId = activePage * 10

        return (
            <div>
                <Dropdown text='Actions'>
                    <Dropdown.Menu>
                        <Dropdown.Item icon='share' text='Move to other Subdomain' onClick={()=>{
                            console.log('click move to other domain')
                        }}/>
                        <Dropdown.Divider />
                        <Dropdown.Item icon='trash' text='Remove' onClick={()=>{
                            for (let i = 0; i < intents.length; i++) {
                                for(let j = 0; j < allCheckedItems.length; ++j) {
                                    if (intents[i].intent === allCheckedItems[j]) {
                                        intents.splice(i, 1)
                                    }
                                }
                            }
                            updateIntents(intents)
                            this.setState({allCheckedItems: []})
                        }}/>
                    </Dropdown.Menu>
                </Dropdown>

                <Table selectable>

                    <Table.Body>
                        {intents.slice(sliceStartId, sliceEndId).map((intent, index) => {
                            // the real index
                            index += sliceStartId

                            // whether the item has been checked previously or not
                            let checkedOrNot = false
                            allCheckedItems.forEach((item) => {
                                if (item === intent.intent) {
                                    checkedOrNot = true
                                }
                            })

                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <ConfirmRemove confirmAction={() => {
                                            // remove this intent
                                            intents.splice(index, 1)
                                            // then update my redux store
                                            updateIntents(intents)
                                        }} />
                                        <Checkbox name={intent.intent} checked={checkedOrNot} onClick={(event, data)=>{
                                            if(data.checked) {
                                                this.PushCheckedItem(data.name)
                                            }
                                            else {
                                                this.PopCheckedItem(data.name)
                                            }
                                        }}/>
                                        &nbsp; &nbsp;
                                        <span style={{ cursor: 'pointer' }} onClick={() => { history.push(`${match.url}/${index}`) }}>{intent.intent}</span>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>
                                <FooterForm placeholder='Create New Intent' formSubmit={(formvalue) => {
                                    intents.push(new Intent(formvalue, [], []))
                                    updateIntents(intents)
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

export default DisplayIntentsTable
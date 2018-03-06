import React, { Component } from 'react'
import Action from './../classes/Action'
import FooterForm from './FooterForm'
import ConfirmRemove from './ConfirmRemove'
import TextResponse from './../classes/TextResponse'
import { Table, Pagination, Checkbox, Dropdown, Message } from 'semantic-ui-react'

class DisplayActionsTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      allCheckedItems: []
    }
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  PushCheckedItem = (itemName) => {
    this.setState({ allCheckedItems: [...this.state.allCheckedItems, itemName] })
  }

  PopCheckedItem = (itemName) => {
    let newItemlist = []
    this.state.allCheckedItems.forEach((item) => {
      if (item !== itemName) {
        newItemlist.push(item)
      }
    })
    this.setState({ allCheckedItems: newItemlist })
  }

  render() {

    // deep clone the actions
    // these are the one i want to display
    let actions = JSON.parse(JSON.stringify(this.props.cbActions))
    const { activePage, allCheckedItems } = this.state
    const { history, match, updateActions } = this.props

    // first see how many pages
    let totalpages = Math.ceil(actions.length / 10.0)
    let displayPagination = ''
    if (totalpages > 1) {
      displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
    }

    const sliceStartId = (activePage - 1) * 10
    const sliceEndId = activePage * 10

    let EmptyMsg = ''
    if (actions.length === 0) {
      EmptyMsg = (
        <Message info>
          <Message.Header>0 Actions Found</Message.Header>
          <p>Create a new action by submitting a form below</p>
        </Message>
      )
    }

    return (
      <div>
        {EmptyMsg}
        <Dropdown text='Actions'>
          <Dropdown.Menu>
            <Dropdown.Item icon='share' text='Move to other Subdomain' onClick={() => {

            }} />
            <Dropdown.Divider />
            <Dropdown.Item icon='trash' text='Remove' onClick={() => {
              for (let i = 0; i < actions.length; i++) {
                for (let j = 0; j < allCheckedItems.length; ++j) {
                  if (actions[i].name === allCheckedItems[j]) {
                    actions.splice(i, 1)
                  }
                }
              }
              updateActions(actions)
              this.setState({ allCheckedItems: [] })
            }} />
          </Dropdown.Menu>
        </Dropdown>

        <Table selectable>

          <Table.Body>
            {actions.slice(sliceStartId, sliceEndId).map((action, index) => {
              // the real index
              index += sliceStartId

              // whether the item has been checked previously or not
              let checkedOrNot = false
              allCheckedItems.forEach((item) => {
                if (item === action.name) {
                  checkedOrNot = true
                }
              })

              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <ConfirmRemove confirmAction={() => {
                      actions.splice(index, 1)
                      updateActions(actions)
                    }} />
                    <Checkbox name={action.name} checked={checkedOrNot} onClick={(event, data) => {
                      if (data.checked) {
                        this.PushCheckedItem(data.name)
                      }
                      else {
                        this.PopCheckedItem(data.name)
                      }
                    }} />
                    &nbsp; &nbsp;
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
      </div>
    )
  }
}

export default DisplayActionsTable
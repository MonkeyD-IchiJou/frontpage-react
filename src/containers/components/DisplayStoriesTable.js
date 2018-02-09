import React, { Component } from 'react'
import FooterForm from './FooterForm'
import ConfirmRemove from './ConfirmRemove'
import { Table, Pagination, Dropdown, Checkbox, Message } from 'semantic-ui-react'
import Story from '../classes/Story'

class DisplayStoriesTable extends Component {

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

    let stories = JSON.parse(JSON.stringify(this.props.cbStories))
    const { activePage, allCheckedItems } = this.state
    const { history, match, updateStories } = this.props

    // first see how many pages
    let totalpages = Math.ceil(stories.length / 10.0)
    let displayPagination = ''
    if (totalpages > 1) {
      displayPagination = (<Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={totalpages} />)
    }

    const sliceStartId = (activePage - 1) * 10
    const sliceEndId = activePage * 10

    let EmptyMsg = ''
    if (stories.length === 0) {
      EmptyMsg = (
        <Message info>
          <Message.Header>0 Stories Found</Message.Header>
          <p>Create a new story by submitting a form below</p>
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
              for (let i = 0; i < stories.length; i++) {
                for (let j = 0; j < allCheckedItems.length; ++j) {
                  if (stories[i].name === allCheckedItems[j]) {
                    stories.splice(i, 1)
                  }
                }
              }
              updateStories(stories)
              this.setState({ allCheckedItems: [] })
            }} />
          </Dropdown.Menu>
        </Dropdown>

        <Table selectable>

          <Table.Body>
            {stories.slice(sliceStartId, sliceEndId).map((action, index) => {
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
                      stories.splice(index, 1)
                      updateStories(stories)
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
                <FooterForm placeholder='Create New Story' formSubmit={(formvalue) => {
                  stories.push(new Story(formvalue, '', '', [], [], ''))
                  updateStories(stories)
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

export default DisplayStoriesTable
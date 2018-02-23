import React, { Component } from 'react'
import { Segment, Button, Table, Header, Divider, Modal } from 'semantic-ui-react'
import CreateNewCB from './CreateNewCB'
import { Link } from "react-router-dom"

class CbDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  render() {

    const { chatbotsReducer, createNewChatbot } = this.props

    const listChatbots = chatbotsReducer.map((chatbot, index) =>
      <Table.Row key={index}>
        <Table.Cell>
          <Link to={'/console/chatbot/' + chatbot.uuid}>{chatbot.name}</Link>
        </Table.Cell>
        <Table.Cell>
          {chatbot.description}
        </Table.Cell>
      </Table.Row>
    )

    return (
      <Segment>

        <Header>Chatbot Projects</Header>

        <Table striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Header>name</Header></Table.HeaderCell>
              <Table.HeaderCell><Header>description</Header></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {listChatbots}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='2'>
                <Modal 
                  trigger={<Button icon='plus' floated='right' primary compact onClick={this.handleOpen}/>}
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                >
                    <Modal.Header>Create a new chatbot</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <CreateNewCB createNewChatbot={(name, description)=>{
                          this.handleClose()
                          createNewChatbot(name, description)
                        }}/>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                <Divider hidden />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>

        </Table>

      </Segment>
    )

  }
}

export default CbDashboard
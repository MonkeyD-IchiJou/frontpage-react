import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class CreateNewCB extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, description } = this.state
    this.props.createNewChatbot(name, description)
    this.setState({name: '', description: ''})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input required name='name' label="Chatbot's Name" placeholder="Enter the name of the chatbot" onChange={this.handleChange} />
        <Form.Input required name='description' label='Description' placeholder='Enter the description of the chatbot' onChange={this.handleChange} />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }

}

export default CreateNewCB
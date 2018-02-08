import React, { Component } from 'react'
import { Segment, Input, Label, Icon, Form, Grid, Popup } from 'semantic-ui-react'

class EditEntityValue extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newsynonym: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    let { name, synonyms } = this.props.value
    let newsynonym = this.state.newsynonym

    return (
      <Segment>

        <Label attached='top'>
          <Popup
            trigger={
              <Icon name='close' color='red' onClick={this.props.removeValue} style={{ float: 'right' }} />
            }
            content='Remove Value'
          />
        </Label>

        <Grid columns='equal'>
          <Grid.Column>
            <Input fluid value={name} onChange={(event, data) => {
              this.props.editValueName(data.value)
            }} />
          </Grid.Column>

          <Grid.Column>

            <Form onSubmit={() => {
              this.setState({ newsynonym: '' })
              this.props.addNewSynonym(newsynonym)
            }}>
              <Form.Input placeholder='New Synonyms' name='newsynonym' value={newsynonym} onChange={this.handleChange} />
            </Form>

            <div style={{ paddingBottom: '10px', paddingTop: '10px' }}>
              {synonyms.map((synonym, index) => {
                return (
                  <span key={index} style={{ paddingRight: '10px', paddingTop: '10px' }}>
                    <Label size='big'>
                      {synonym}
                      <Icon name='delete' onClick={() => {
                        this.props.deleteSynonym(index)
                      }} />
                    </Label>
                  </span>
                )
              })}
            </div>

          </Grid.Column>

        </Grid>

      </Segment>
    )
  }

}

export default EditEntityValue
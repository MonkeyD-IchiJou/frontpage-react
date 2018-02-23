import React, { Component } from 'react'
import Entity from './../classes/Entity'
import EntityValues from './../classes/EntityValues'
import ProgressSave from './ProgressSave'
import { Prompt } from 'react-router-dom'
import EditEntityValue from './EditEntityValue'
import { Input, Header, Form } from 'semantic-ui-react'

class EditEntity extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      values: [],
      hasSaved: true,
      newvalue: ''
    }

    if (this.props.entity) {
      this.state = {
        name: this.props.entity.name,
        values: JSON.parse(JSON.stringify(this.props.entity.values)),
        hasSaved: true,
        newvalue: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // cases like when user refresh the this current page and parents send down the props
    if (nextProps.entity) {
      this.setState({
        name: nextProps.entity.name,
        values: JSON.parse(JSON.stringify(nextProps.entity.values)),
        hasSaved: true,
        newvalue: ''
      })
    }
  }

  editChanges = (states) => {
    this.setState({ ...states, hasSaved: false })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {

    let { name, values, hasSaved, newvalue } = this.state

    return (
      <div style={{ padding: '10px' }}>

        <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

        <ProgressSave
          hasSaved={hasSaved}
          clickDone={() => {
            this.setState({ hasSaved: true })
            this.props.updateEntities(new Entity(name, values))
          }}
        />

        <Header>
          Name
                </Header>

        <Input fluid value={name} onChange={(event, data) => {
          this.editChanges({ name: data.value })
        }} />

        <Header>Values</Header>

        {
          values.map((value, vindex) => {
            return <EditEntityValue
              key={vindex}
              value={value}
              editValueName={(valuename) => {
                values[vindex].name = valuename
                this.editChanges({ values: values })
              }}
              addNewSynonym={(synonym) => {
                values[vindex].synonyms.push(synonym)
                this.editChanges({ values: values })
              }}
              deleteSynonym={(sindex) => {
                values[vindex].synonyms.splice(sindex, 1)
                this.editChanges({ values: values })
              }}
              removeValue={() => {
                values.splice(vindex, 1)
                this.editChanges({ values: values })
              }}
            />
          })
        }

        <Form onSubmit={() => {
          values.push(new EntityValues(newvalue, []))
          this.editChanges({ values: values, newvalue: '' })
        }}>
          <Form.Input placeholder='New Value' name='newvalue' value={newvalue} onChange={this.handleChange} />
        </Form>

      </div>
    )
  }
}

export default EditEntity

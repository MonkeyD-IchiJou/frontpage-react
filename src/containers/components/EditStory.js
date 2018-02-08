import React, { Component } from 'react'
import ProgressSave from './ProgressSave'
import { Prompt } from 'react-router-dom'
import EditIntentConditions from './EditIntentConditions'
import { Button, Icon, Header, Input, Divider, Segment, Dropdown } from 'semantic-ui-react'

class EditStory extends Component {

  constructor(props) {
    super(props)

    this.state = {
      storyName: '',
      wait_checkpoint: '',
      intent: '',
      intentConditions: [],
      actions: [],
      return_checkpoint: '',
      hasSaved: true
    }

    if (this.props.story) {
      this.state = {
        storyName: this.props.story.name,
        wait_checkpoint: this.props.story.wait_checkpoint,
        intent: this.props.story.intent,
        intentConditions: JSON.parse(JSON.stringify(this.props.story.intentConditions)),
        actions: JSON.parse(JSON.stringify(this.props.story.actions)),
        return_checkpoint: this.props.story.return_checkpoint,
        hasSaved: true
      }
    }
  }

  editChanges = (states) => {
    this.setState({ ...states, hasSaved: false })
  }

  render() {
    let { storyName, wait_checkpoint, intent, intentConditions, actions, return_checkpoint, hasSaved } = this.state
    const { allAvailableActions, allAvailableIntents, allAvailableEntities, allAvailableEntityValues } = this.props

    return (
      <div style={{ padding: '10px' }}>

        <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

        <ProgressSave
          hasSaved={hasSaved}
          clickDone={() => {
            this.props.updateStories({ name: storyName, wait_checkpoint, intent, intentConditions, actions, return_checkpoint })
          }}
        />

        <Header>Story Name</Header>

        <Input value={storyName} fluid onChange={(event, data) => {
          this.editChanges({ storyName: data.value })
        }} />

        <Header>Paths</Header>

        <Segment>

          <Header>Checkpoint In</Header>
          <Input value={wait_checkpoint} fluid onChange={(event, data) => {
            this.editChanges({ wait_checkpoint: data.value })
          }} />

          <Header>Intent</Header>

          <Dropdown
            value={intent}
            placeholder='Select Intent'
            fluid
            search
            selection
            options={allAvailableIntents}
            onChange={(e, { value }) => {
              this.editChanges({ intent: value })
            }}
          />

          <Divider hidden />

          <EditIntentConditions intentConditions={intentConditions} allAvailableEntities={allAvailableEntities} allAvailableEntityValues={allAvailableEntityValues} updateIntentCondition={(intentCondition, iindex) => {
            intentConditions[iindex] = intentCondition
            this.editChanges({ intentConditions: intentConditions })
          }} />

          <Divider hidden />

          <Button onClick={() => {
            intentConditions.push({ entity: '', value: '' })
            this.editChanges({ intentConditions: intentConditions })
          }}>
            <Icon name='plus' />Add Condition
                    </Button>

          <Header>Actions</Header>

          {actions.map((action, aindex) => {
            return (
              <Dropdown
                key={aindex}
                value={action}
                placeholder='Select Action'
                fluid
                search
                selection
                options={allAvailableActions}
                onChange={(e, { value }) => {
                  actions[aindex] = value
                  this.editChanges({ actions: actions })
                }}
              />
            )
          })}

          <Divider hidden />

          <Button onClick={() => {
            actions.push('')
            this.editChanges({ actions: actions })
          }}>
            <Icon name='plus' />Add New Action
                    </Button>

          <Divider hidden />

          <Header>Checkpoint Out</Header>
          <Input value={return_checkpoint} fluid onChange={(event, data) => {
            this.editChanges({ return_checkpoint: data.value })
          }} />

        </Segment>

        <Divider hidden /><Divider hidden />

      </div>
    )
  }
}

export default EditStory
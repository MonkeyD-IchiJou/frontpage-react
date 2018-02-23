import React, { Component } from 'react'
import ProgressSave from './ProgressSave'
import EditSingleAction from './EditSingleAction'
import TextResponse from './../classes/TextResponse'
import { Prompt } from 'react-router-dom'
import { Button, Icon, Header, Input, Divider } from 'semantic-ui-react'

class EditAction extends Component {

  constructor(props) {
    super(props)

    this.state = {
      actionName: '',
      allActions: [],
      hasSaved: true
    }

    if (this.props.action) {
      this.state = {
        actionName: this.props.action.name,
        allActions: JSON.parse(JSON.stringify(this.props.action.allActions)),
        hasSaved: true
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // cases like when user refresh the this current page and parents send down the props
    if (nextProps.action) {
      this.setState({
        actionName: nextProps.action.name,
        allActions: JSON.parse(JSON.stringify(nextProps.action.allActions)),
        hasSaved: true
      })
    }
  }

  editChanges = (states) => {
    this.setState({ ...states, hasSaved: false })
  }

  render() {

    let { actionName, allActions, hasSaved } = this.state

    return (
      <div style={{ padding: '10px' }}>

        <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

        <ProgressSave
          hasSaved={hasSaved}
          clickDone={() => {
            this.setState({ hasSaved: true })
            this.props.updateActions({ name: actionName, allActions: allActions })
          }}
        />

        <Header>Action Name</Header>

        <Input value={actionName} fluid onChange={(event, data) => {
          this.editChanges({ actionName: data.value })
        }} />

        <Header>Actions</Header>

        {allActions.map((actions, index) => {
          return (
            <EditSingleAction
              actions={actions}
              removeAction={() => {
                allActions.splice(index, 1)
                this.editChanges({ allActions: allActions })
              }}
              updateActions={(actions) => {
                allActions[index] = actions
                this.editChanges({ allActions: allActions })
              }}
              key={index}
            />
          )
        })}

        <Divider hidden /><Divider hidden />

        <Divider />

        <Button primary onClick={() => {
          allActions.push([new TextResponse('')])
          this.editChanges({ allActions: allActions })
        }}>
          <Icon name='plus' />Create New Action
        </Button>

      </div>
    )
  }
}

export default EditAction

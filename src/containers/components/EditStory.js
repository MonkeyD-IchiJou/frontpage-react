import React, { Component } from 'react'
import ProgressSave from './ProgressSave'
import { Prompt } from 'react-router-dom'
import { Button, Icon, Header, Input, Divider, Segment, Dropdown } from 'semantic-ui-react'

class EditStory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            storyName: '',
            wait_checkpoint: '',
            intent: '',
            actions: [],
            return_checkpoint: '',
            hasSaved: true
        }

        if (this.props.story) {
            this.state = {
                storyName: this.props.story.name,
                wait_checkpoint: this.props.story.wait_checkpoint,
                intent: this.props.story.intent,
                actions: JSON.parse(JSON.stringify(this.props.story.actions)),
                return_checkpoint: this.props.story.return_checkpoint,
                hasSaved: true
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.story) {
            this.setState({
                storyName: nextProps.story.name,
                wait_checkpoint: nextProps.story.wait_checkpoint,
                intent: nextProps.story.intent,
                actions: JSON.parse(JSON.stringify(nextProps.story.actions)),
                return_checkpoint: nextProps.story.return_checkpoint,
                hasSaved: true
            })
        }
    }

    editChanges = (states) => {
        this.setState({ ...states, hasSaved: false })
    }

    render() {
        let { storyName, wait_checkpoint, intent, actions, return_checkpoint, hasSaved } = this.state
        const { allAvailableActions, allAvailableIntents } = this.props

        return (
            <div style={{ padding: '10px' }}>

                <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

                <ProgressSave
                    clickDone={() => {
                        this.props.updateStories({ name: storyName, wait_checkpoint, intent, actions, return_checkpoint })
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

                    <Divider hidden />

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

                    <Header>Actions</Header>

                    {actions.map((action, aindex)=>{
                        return(
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
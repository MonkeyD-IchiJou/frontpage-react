import React, { Component } from 'react'
import Path from '../classes/Path'
import ProgressSave from './ProgressSave'
import { Prompt } from 'react-router-dom'
import { Button, Icon, Header, Input, Divider, Segment, Label, Popup, Dropdown } from 'semantic-ui-react'

class EditStory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            storyName: '',
            paths: [],
            hasSaved: true
        }

        if (this.props.story) {
            this.state = {
                storyName: this.props.story.name,
                paths: JSON.parse(JSON.stringify(this.props.story.paths)),
                hasSaved: true
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.story) {
            this.setState({
                storyName: nextProps.story.name,
                paths: JSON.parse(JSON.stringify(nextProps.story.paths)),
                hasSaved: true
            })
        }
    }

    editChanges = (states) => {
        this.setState({ ...states, hasSaved: false })
    }

    render() {
        let { storyName, paths, hasSaved } = this.state
        const { allAvailableActions, allAvailableIntents } = this.props

        return (
            <div style={{ padding: '10px' }}>

                <Prompt when={!hasSaved} message="Warning! All the progress will be lost if you leave this place" />

                <ProgressSave
                    clickDone={() => {
                        this.props.updateStories({ name: storyName, paths: paths })
                    }}
                />

                <Header>Story Name</Header>

                <Input value={storyName} fluid onChange={(event, data) => {
                    this.editChanges({ storyName: data.value })
                }} />

                <Header>Paths</Header>

                {paths.map((path, index)=>{
                    return(
                        <Segment key={index}>

                            <Label attached='top'>
                                <Popup
                                    trigger={
                                        <Icon name='close' color='red' style={{ float: 'right' }} onClick={() => {
                                            paths.splice(index, 1)
                                            this.editChanges({ paths: paths })
                                        }}/>
                                    }
                                    content='Remove Action'
                                />
                            </Label>

                            <Header>Intent</Header>

                            <Dropdown
                                value={path.intent}
                                placeholder='Select Intent'
                                fluid
                                search
                                selection
                                options={allAvailableIntents}
                                onChange={(e, { value }) => {
                                    paths[index].intent = value
                                    this.editChanges({ paths: paths })
                                }}
                            />

                            <Header>Actions</Header>

                            {path.actions.map((action, aindex)=>{
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
                                            paths[index].actions[aindex] = value
                                            this.editChanges({ paths: paths })
                                        }}
                                    />
                                )
                            })}

                            <Divider hidden />

                            <Button onClick={() => {
                                paths[index].actions.push('')
                                this.editChanges({ paths: paths })
                            }}>
                                <Icon name='plus' />Add New Action
                            </Button>

                        </Segment>
                    )
                })}

                <Divider hidden /><Divider hidden />

                <Divider />

                <Button primary onClick={() => {
                    paths.push(new Path('', []))
                    this.editChanges({ paths: paths })
                }}>
                    <Icon name='plus' />Create New Path
                </Button>
            </div>
        )
    }
}

export default EditStory
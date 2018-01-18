import React, { Component } from 'react'
import ProgressSave from './ProgressSave'
import EditSingleAction from './EditSingleAction'
import TextResponse from './../../classes/TextResponse'
import { Button, Icon, Header, Input, Divider } from 'semantic-ui-react'

class EditAction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            actionName: this.props.action.name,
            allActions: JSON.parse(JSON.stringify(this.props.action.allActions))
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            actionName: nextProps.action.name,
            allActions: JSON.parse(JSON.stringify(nextProps.action.allActions))
        })
    }

    render() {

        let { actionName, allActions } = this.state

        return(
            
            <div style={{padding: '10px'}}>

                <ProgressSave
                    clickDone={() => {
                        this.props.updateActions({ name: actionName, allActions: allActions })
                    }}
                />

                <Header>Action Name</Header>

                <Input value={actionName} fluid onChange={(event, data) => {
                    this.setState({ actionName: data.value })
                }} />

                <Header>Actions</Header>

                {allActions.map((actions, index)=>{
                    return (
                        <EditSingleAction
                            actions={actions}
                            removeAction={() => {
                                allActions.splice(index, 1)
                                this.setState({ allActions: allActions })
                            }}
                            updateActions={(actions)=>{
                                allActions[index] = actions
                                this.setState({ allActions: allActions })
                            }}
                            key={index} 
                        />
                    )
                })}

                <Divider hidden /><Divider hidden />

                <Divider />

                <Button primary onClick={()=>{
                    allActions.push([new TextResponse('')])
                    this.setState({ allActions: allActions })
                }}>
                    <Icon name='plus'/>Create New Action
                </Button>

            </div>
        )
    }
}

export default EditAction

/*
<Modal
    trigger={
        <div>
            <ConfirmRemove confirmAction={()=>{this.props.removeActions()}} />
            <span style={{ cursor: 'pointer' }} onClick={this.handleOpen}>{actionName}</span>
        </div>
    }
    open={this.state.modalOpen}
    onClose={this.handleClose}
    closeOnDimmerClick={false}
    size="fullscreen"
>
*/
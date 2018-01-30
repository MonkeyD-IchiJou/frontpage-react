import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class LcChatbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msg: ''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        const { msg } = this.state
        const { currentClient, LivechatSendClientMsg, currentChatLogs } = this.props
        let d = true
        if (currentClient.clientName) {
            d = false
        }
        return (
            <div>

                <Form onSubmit={() => {
                    this.setState({msg: ''})
                    LivechatSendClientMsg(currentClient.clientSocketId, currentClient.clientName, msg)
                }}>
                    <Form.Input disabled={d} placeholder='Enter Msg' name='msg' value={msg} onChange={this.handleChange} />
                </Form>

                {this.props.currentClient.clientName} msg: 

                {currentChatLogs.map((log, index)=>{
                    return (<div key={index}>{log}</div>)
                })}

            </div>
        )
    }
}

export default LcChatbox
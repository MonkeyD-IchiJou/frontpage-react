import React, { Component } from 'react'
import { Form, Icon, Label } from 'semantic-ui-react'

class ResponseQR extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newbutton: ''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        let action = JSON.parse(JSON.stringify(this.props.action))
        let buttons = action.buttons
        let newbutton = this.state.newbutton

        return (
            <div>

                <div style={{ paddingBottom: '10px' }}>
                    {buttons.map((button, index) => {
                        return (
                            <span key={index} style={{ paddingRight: '10px', paddingTop: '10px' }}>
                                <Label size='big'>
                                    {button.text}
                                    <Icon name='delete' onClick={()=>{
                                        buttons.splice(index, 1)
                                        this.props.updateAction(action)
                                    }}/>
                                </Label>
                            </span>
                        )
                    })}
                </div>

                <Form onSubmit={() => {
                    buttons.push({ text: newbutton, payload: newbutton })
                    this.setState({ newbutton: '' })
                    this.props.updateAction(action)
                }}>
                    <Form.Input placeholder='New Button' name='newbutton' value={newbutton} onChange={this.handleChange} />
                </Form>

            </div>
        )
    }
}

export default ResponseQR
import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class ResponseCustom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jsonfield: JSON.stringify(this.props.action.customObj)
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        let action = JSON.parse(JSON.stringify(this.props.action))
        const { jsonfield } = this.state

        return (
            <Form onSubmit={()=>{

                try{
                    action.customObj = JSON.parse(jsonfield)
                    this.props.updateAction(action)
                } catch(e) {
                    console.log(e.toString())
                }

            }}>
                <Form.TextArea value={this.state.jsonfield} name='jsonfield' placeholder='{}' onChange={this.handleChange}/>
                <Form.Button>Check Json & Save</Form.Button>
            </Form>
        )
    }
}

export default ResponseCustom
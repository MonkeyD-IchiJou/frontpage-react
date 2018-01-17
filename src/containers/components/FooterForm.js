import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class FooterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formvalue: ''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {

        const { placeholder, formSubmit } = this.props
        const { formvalue } = this.state

        return (
            <Form onSubmit={() => {
                formSubmit(formvalue)
                this.setState({ formvalue: '' })
            }}>
                <Form.Input required placeholder={placeholder} name='formvalue' value={formvalue} onChange={this.handleChange} />
            </Form>
        )
    }
}

export default FooterForm
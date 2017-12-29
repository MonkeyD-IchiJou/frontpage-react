import React, { Component } from 'react'
import { Segment, Header, Icon, Form, Button, Message } from 'semantic-ui-react'

class Loginpage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            submittedName: '',
            submittedEmail: '',
            formError: false,
            formLoading: false
        }
    }

    errorCB = (e) => {
        this.setState({ formError: true, formLoading: false })
    }

    successCB = () => {
        // if success, automatically go to console page
        this.props.history.push('/console')
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { email, password } = this.state
        this.setState({ submittedEmail: email, submittedPassword: password, formLoading: true })
        this.props.ClickLogin(email, password, this.successCB, this.errorCB)
    }

    render() {

        const { formError, formLoading } = this.state

        return (

            <Segment.Group
                stacked
                style={{
                    margin: '10%',
                    marginLeft: '15%',
                    marginRight: '15%'
                }}
            >

                <Segment textAlign='center'>
                    <Header as='h2' icon>
                        <Icon name='sign in' />
                        <Header.Subheader>
                            Please login with your email address and password
                        </Header.Subheader>
                    </Header>
                </Segment>

                <Segment>
                    <Form onSubmit={this.handleSubmit} error={formError} loading={formLoading}>
                        <Form.Input required name='email' label=' Email' type='email' placeholder='Enter email' onChange={this.handleChange}/>
                        <Form.Input required name='password' label=' Password' type='password' placeholder='Enter password' onChange={this.handleChange}/>
                        <Message
                            error
                            header='Action Forbidden'
                            content='Email address or password are incorrect'
                        />
                        <Button type='submit'>Submit</Button>
                        
                    </Form>
                </Segment>

            </Segment.Group>
        )
    }
}

export default Loginpage
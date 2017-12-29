import React, { Component } from 'react'

class Chatbot extends Component {
    componentDidMount() {
        // change the header title to dashboard
        this.props.changeTitle('Chatbot-afadfasf')
    }
    render() {
        return (
            <div>Chatbot</div>
        )
    }
}

export default Chatbot
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Homepage extends Component {
    render() {
        return (
            <div>
                Home page here
                <Button
                    onClick={() => this.props.history.push('/login')}
                >
                    Login
                </Button>
            </div>
        )
    }
}

export default Homepage
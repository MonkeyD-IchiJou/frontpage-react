import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Console extends Component {

    render() {
        return (
            <div>
                Console
                <Button onClick={() => {
                    this.props.ClickLogout()
                }}>
                    Logout
                </Button>
            </div>
        )
    }
}

export default Console
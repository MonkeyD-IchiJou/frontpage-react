import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Homepage extends Component {
    render() {
        return (
            <div>
                <Button onClick={() => { this.props.history.push('/console')}}>Go to Console Page</Button>
            </div>
        )
    }
}

export default Homepage
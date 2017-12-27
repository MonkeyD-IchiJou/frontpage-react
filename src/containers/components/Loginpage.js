import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Loginpage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: 'kek'
        }
    }

    errorCB = (e) => {
        this.setState({info: e})
    }
    successCB = () => {
        // if success, automatically go to console page
        this.props.history.push('/console')
    }

    render() {

        return (
            <div>
                Login page here
                <Button
                    onClick={() => { 
                        this.props.ClickLogin('ichijou8282@gmail.com', 'ichijou1234', this.successCB, this.errorCB) 
                    }}
                >
                Submit login info
                </Button>
                {this.state.info}
            </div>
        )
    }
}

export default Loginpage
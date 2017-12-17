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
        console.log(e)
        this.setState({info: e})
    }
    successCB = () => {
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
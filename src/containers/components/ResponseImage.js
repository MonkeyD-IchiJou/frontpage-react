import React, { Component } from 'react'
import { Input, Image } from 'semantic-ui-react'

class ResponseImage extends Component {

    render() {
        let action = JSON.parse(JSON.stringify(this.props.action))
        return (
            <div>
                <Input value={action.image} fluid onChange={(event, data) => {
                    action.image = data.value
                    this.props.updateAction(action)
                }} />
                <Image src={action.image} href={action.image} style={{paddingTop: '10px', paddingLeft: '5px'}}/>
            </div>
        )
    }
}

export default ResponseImage
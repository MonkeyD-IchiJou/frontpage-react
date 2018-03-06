import React, { Component } from 'react'
import { Input, Image } from 'semantic-ui-react'

class ResponseImage extends Component {
  render() {
    let action = JSON.parse(JSON.stringify(this.props.action))
    return (
      <div>
        <Image src={action.image} href={action.image} style={{ paddingBottom: '10px', paddingLeft: '5px' }} />
        <Input value={action.image} fluid onChange={(event, data) => {
          action.image = data.value
          this.props.updateAction(action)
        }} />
      </div>
    )
  }
}

export default ResponseImage
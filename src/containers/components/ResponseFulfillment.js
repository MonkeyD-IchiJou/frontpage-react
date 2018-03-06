import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class ResponseFulfillment extends Component {
  render() {
    let action = JSON.parse(JSON.stringify(this.props.action))
    return (
      <div>
        <Input value={action.serviceLink} fluid onChange={(event, data) => {
          action.serviceLink = data.value
          this.props.updateAction(action)
        }} />
      </div>
    )
  }
}

export default ResponseFulfillment
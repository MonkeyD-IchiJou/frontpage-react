import React, { Component } from 'react'
import FooterForm from './FooterForm'
import { Segment, Divider } from 'semantic-ui-react'

class EditInitRes extends Component {
  render() {
    const { SetInitResponse, initialResponse } = this.props
    return (
      <Segment>
        {initialResponse}
        <Divider hidden/>
        <FooterForm placeholder='Update initial Response' formSubmit={(formvalue) => {
          SetInitResponse(formvalue)
        }} />
      </Segment>
    )
  }
}

export default EditInitRes

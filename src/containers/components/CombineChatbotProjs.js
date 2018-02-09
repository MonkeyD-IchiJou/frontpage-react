import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Dropdown, Header } from 'semantic-ui-react'

class CombineChatbotProjs extends Component {
  render() {
    const { chatbotsReducer, combinedCbProjs, chatbotInfo } = this.props

    let allchosencbprojs = []
    let availableCbProjs = []

    if (chatbotInfo.uuid) {
      allchosencbprojs = chatbotInfo.combinedprojs.map((val) => {
        return val
      })

      chatbotsReducer.forEach((val, index) => {
        if (chatbotInfo.uuid !== val.uuid) {
          availableCbProjs.push({ text: val.uuid, value: val.uuid })
        }
      })
    }

    return (
      <Segment>
        <Header>Combined with other Chatbot projects</Header>
        <Dropdown
          value={allchosencbprojs}
          placeholder='Select Entity'
          fluid
          search
          multiple
          selection
          options={availableCbProjs}
          onChange={(e, { value }) => {
            combinedCbProjs(value)
          }}
        />
      </Segment>
    )
  }
}

export default CombineChatbotProjs

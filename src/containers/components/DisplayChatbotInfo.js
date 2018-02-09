import React, { Component } from 'react'
import { Segment, Item } from 'semantic-ui-react'

class DisplayChatbotInfo extends Component {
  render() {
    const { backendUrl, chatbotInfo } = this.props
    return(
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{chatbotInfo.name}</Item.Header>
              <Item.Description>
                {chatbotInfo.description}
              </Item.Description>
              <Item.Extra><a href={backendUrl + '/render/?botToken=' + chatbotInfo.uuid} target="_blank">{chatbotInfo.uuid}</a></Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    )
  }
}

export default DisplayChatbotInfo

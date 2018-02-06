import React, { Component } from 'react'
import { Segment, Item } from 'semantic-ui-react'

class SettingLivechat extends Component {
    render() {
        const { backendUrl, livechatInfo } = this.props

        return (
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header>{livechatInfo.name}</Item.Header>
                            <Item.Description>
                                {livechatInfo.description}
                            </Item.Description>
                            <Item.Extra><a href={backendUrl + '/render/?livechatToken=' + livechatInfo.uuid} target="_blank">{livechatInfo.uuid}</a></Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        )
    }
}

export default SettingLivechat
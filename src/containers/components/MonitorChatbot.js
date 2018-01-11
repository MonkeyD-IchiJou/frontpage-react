import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

class MonitorChatbot extends Component {

    render() {
        let renderobj = ''
        const clientsOnlineList = this.props.clientsOnlineList

        if (clientsOnlineList) {
            renderobj = clientsOnlineList.map((clients) =>
                <div key={clients.clientSocketId}>
                    {clients.clientSocketId}
                </div>
            )
        }

        return(
            <Segment>
                {renderobj}
            </Segment>
        )
    }
}

export default MonitorChatbot
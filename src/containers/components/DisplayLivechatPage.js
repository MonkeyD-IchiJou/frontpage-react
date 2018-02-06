import React, { Component } from 'react'
import LivechatConsole from './LivechatConsole'
import { Grid } from 'semantic-ui-react'
import LcChatbox from './LcChatbox'

class DisplayLivechatPage extends Component {

    render() {

        const {
            match,
            history,
            chosenLivechat,
            clientOnlineLists,
            selectCurrentClientToChatWith,
            LivechatSendClientMsg,
            currentClient,
            currentChatLogs,
            backendUrl
        } = this.props

        if (chosenLivechat) {

            return (
                <Grid columns={2} stackable divided>

                    <Grid.Column width={11}>
                        <LivechatConsole
                            match={match}
                            history={history}
                            livechatInfo={chosenLivechat}
                            clientOnlineLists={clientOnlineLists}
                            selectCurrentClientToChatWith={selectCurrentClientToChatWith}
                            backendUrl={backendUrl}
                        />
                    </Grid.Column>

                    <Grid.Column width={5}>
                        <LcChatbox currentClient={currentClient} LivechatSendClientMsg={LivechatSendClientMsg} currentChatLogs={currentChatLogs}/>
                    </Grid.Column>

                </Grid>
            )

        }
        else {
            return (<div>loading livechat info</div>)
        }

    }

}

export default DisplayLivechatPage
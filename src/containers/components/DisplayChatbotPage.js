import React, { Component } from 'react'
import ChatbotConsole from './ChatbotConsole'
import FooterForm from './FooterForm'
import DisplayCbQueryRes from './DisplayCbQueryRes'
import { Grid, Button, Icon, Divider } from 'semantic-ui-react'

class DisplayChatbotPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayTmpJson: {}
    }
  }

  render() {

    const {
      chosenChatbot,
      updateEntities,
      updateIntents,
      updateActions,
      updateStories,
      match,
      history,
      SaveChatbotDatas,
      checkQuery,
      uuid,
      backendUrl,
      DeleteChatbot,
      clientLists,
      combinedCbProjs,
      jwt,
      SetInitResponse
    } = this.props

    if (chosenChatbot) {

      return (
        <Grid columns={2} stackable divided>

          <Grid.Column width={11}>
            <ChatbotConsole
              match={match}
              history={history}
              chatbotInfo={chosenChatbot}
              updateEntities={updateEntities}
              updateIntents={updateIntents}
              updateActions={updateActions}
              updateStories={updateStories}
              backendUrl={backendUrl}
              DeleteChatbot={DeleteChatbot}
              clientLists={clientLists}
              combinedCbProjs={combinedCbProjs}
              jwt={jwt}
              SetInitResponse={SetInitResponse}
            />
          </Grid.Column>

          <Grid.Column width={5}>

            <Button primary circular disabled={chosenChatbot.isTraining} loading={chosenChatbot.isTraining} onClick={() => {
              SaveChatbotDatas(
                {
                  entities: chosenChatbot.entities,
                  intents: chosenChatbot.intents,
                  actions: chosenChatbot.actions,
                  stories: chosenChatbot.stories,
                  combinedprojs: chosenChatbot.combinedprojs,
                  initialResponse: chosenChatbot.initialResponse
                }
              )
            }} >
              <Icon name='configure' />Train Chatbot
            </Button>

            <Divider />

            <FooterForm placeholder='Turing Test' formSubmit={(formvalue) => {
              checkQuery(formvalue, (displayTmpJson) => {
                this.setState({ displayTmpJson: displayTmpJson })
              })
            }} />

            <DisplayCbQueryRes displayTmpJson={this.state.displayTmpJson} uuid={uuid} chatbotInfo={chosenChatbot} />

          </Grid.Column>

        </Grid>
      )
    }
    else {
      return (<div>loading chatbot info</div>)
    }

  }

}

export default DisplayChatbotPage
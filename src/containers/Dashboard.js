import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqChatbotsInfos_act, createNewChatbot_act } from './actions/chatbotsActions'
import { reqLivechatsInfos_act } from './actions/livechatsActions'
import UsrDashboard from './components/UsrDashboard'
import CbDashboard from './components/CbDashboard'
import LcDashboard from './components/LcDashboard'
import { Grid } from 'semantic-ui-react'

class Dashboard extends Component {

  componentDidMount() {
    // change the header title to dashboard
    this.props.changeTitle('Dashboard')

    const { userReducer, backendUrl } = this.props
    const jwt = userReducer.jwt

    // get all the chatbot projects info that this user own
    this.props.dispatch(reqChatbotsInfos_act(backendUrl, jwt))

    // same thing for live chat projects
    this.props.dispatch(reqLivechatsInfos_act(backendUrl, jwt))
  }

  createNewChatbot = (name, description) => {
    const { userReducer, backendUrl } = this.props
    const jwt = userReducer.jwt
    this.props.dispatch(createNewChatbot_act(backendUrl, jwt, name, description)).then(()=>{
      this.props.dispatch(reqChatbotsInfos_act(backendUrl, jwt))
    })
  }

  render() {
    const { userReducer, chatbotsReducer, livechatsReducer } = this.props

    return (
      <Grid stackable columns='equal'>

        <Grid.Column>
          <UsrDashboard userReducer={userReducer} chatbotsReducer={chatbotsReducer} livechatsReducer={livechatsReducer} />
        </Grid.Column>

        <Grid.Column>
          <CbDashboard chatbotsReducer={chatbotsReducer} createNewChatbot={this.createNewChatbot}/>
        </Grid.Column>

        <Grid.Column>
          <LcDashboard livechatsReducer={livechatsReducer} />
        </Grid.Column>

      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatbotsReducer: state.chatbotsReducer,
    livechatsReducer: state.livechatsReducer
  }
}

export default connect(mapStateToProps)(Dashboard)

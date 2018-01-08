import React, { Component } from 'react'
import UsrDashboard from './UsrDashboard'
import CbDashboard from './CbDashboard'
import LcDashboard from './LcDashboard'
import { Grid } from 'semantic-ui-react'

class Dashboard extends Component {

    componentDidMount() {
        // change the header title to dashboard
        this.props.changeTitle('Dashboard')
    }

    render() {
        const { userReducer, chatbotsReducer, livechatsReducer } = this.props

        return (
            <Grid stackable columns='equal'>

                <Grid.Column>
                    <UsrDashboard userReducer={userReducer} chatbotsReducer={chatbotsReducer} livechatsReducer={livechatsReducer}/>
                </Grid.Column>

                <Grid.Column>
                    <CbDashboard chatbotsReducer={chatbotsReducer}/>
                </Grid.Column>

                <Grid.Column>
                    <LcDashboard livechatsReducer={livechatsReducer}/>
                </Grid.Column>

            </Grid>
        )
    }
}

export default Dashboard
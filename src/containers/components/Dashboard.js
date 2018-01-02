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
        return (
            <Grid stackable columns='equal'>

                <Grid.Column>
                    <UsrDashboard userReducer={this.props.userReducer} chatbotsReducer={this.props.chatbotsReducer}/>
                </Grid.Column>

                <Grid.Column>
                    <CbDashboard chatbotsReducer={this.props.chatbotsReducer}/>
                </Grid.Column>

                <Grid.Column>
                    <LcDashboard />
                </Grid.Column>

            </Grid>
        )
    }
}

export default Dashboard
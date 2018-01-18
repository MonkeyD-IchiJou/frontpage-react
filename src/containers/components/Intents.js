import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import DisplayIntentsTable from './DisplayIntentsTable'
import MasterEditIntents from './MasterEditIntents'

class Intents extends Component {
    render() {
        const { cbIntents, cbEntities, updateIntents } = this.props

        return (
            <div>
                <Route
                    exact
                    path={`${this.props.match.url}/`}
                    render={props => <DisplayIntentsTable {...props} cbIntents={cbIntents} updateIntents={updateIntents} />}
                />
                <Route
                    exact
                    path={`${this.props.match.url}/:topicId`}
                    render={props => <MasterEditIntents {...props} cbIntents={cbIntents} cbEntities={cbEntities} updateIntents={updateIntents} />}
                />
            </div>
        )
    }
}

export default Intents
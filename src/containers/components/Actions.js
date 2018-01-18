import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MasterEditAction from './MasterEditAction'
import DisplayActionsTable from './DisplayActionsTable'

class Actions extends Component {

    render() {

        const { cbActions, updateActions } = this.props

        return (
            <div>
                <Route
                    exact
                    path={`${this.props.match.url}/`}
                    render={props => <DisplayActionsTable {...props} cbActions={cbActions} updateActions={updateActions}/>}
                />
                <Route
                    exact
                    path={`${this.props.match.url}/:topicId`}
                    render={props => <MasterEditAction {...props} cbActions={cbActions} updateActions={updateActions}/>}
                />
            </div>
        )
    }

}

export default Actions
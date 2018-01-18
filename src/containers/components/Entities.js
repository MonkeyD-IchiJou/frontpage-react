import React, { Component } from 'react'
import DisplayEntitiesTable from './DisplayEntitiesTable'
import MasterEditEntities from './MasterEditEntities'
import { Route } from 'react-router-dom'

class Entities extends Component {

    render() {
        const { cbEntities, updateEntities } = this.props

        return (
            <div>
                <Route
                    exact
                    path={`${this.props.match.url}/`}
                    render={props => <DisplayEntitiesTable {...props} cbEntities={cbEntities} updateEntities={updateEntities} />}
                />
                <Route
                    exact
                    path={`${this.props.match.url}/:topicId`}
                    render={props => <MasterEditEntities {...props} cbEntities={cbEntities} updateEntities={updateEntities} />}
                />
            </div>
        )
    }

}


export default Entities
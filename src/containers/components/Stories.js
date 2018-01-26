import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import DisplayStoriesTable from './DisplayStoriesTable'
import MasterEditStories from './MasterEditStories'

class Stories extends Component {

    render() {
        const { cbStories, updateStories, cbIntents, cbActions, cbEntities } = this.props

        const allAvailableActions = cbActions.map((action)=>{
            return { text: action.name, value: action.name }
        })

        const allAvailableIntents = cbIntents.map((intent)=>{
            return { text: intent.intent, value: intent.intent }
        })

        let allAvailableEntityValues = []

        const allAvailableEntities = cbEntities.map((entity)=>{

            entity.values.forEach((val) => {
                allAvailableEntityValues.push({ text: val.name, value: val.name })
            })

            return { text: entity.name, value: entity.name }
        })

        return (
            <div>
                <Route
                    exact
                    path={`${this.props.match.url}/`}
                    render={props => <DisplayStoriesTable {...props} cbStories={cbStories} updateStories={updateStories} />}
                />
                <Route
                    exact
                    path={`${this.props.match.url}/:topicId`}
                    render={props => <MasterEditStories {...props} cbStories={cbStories} updateStories={updateStories} allAvailableActions={allAvailableActions} allAvailableIntents={allAvailableIntents} allAvailableEntities={allAvailableEntities} allAvailableEntityValues={allAvailableEntityValues}/>}
                />
            </div>
        )
    }

}

export default Stories
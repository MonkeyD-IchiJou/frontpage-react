import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import DisplayStoriesTable from './DisplayStoriesTable'
import MasterEditStories from './MasterEditStories'

class Stories extends Component {

    render() {
        const { cbStories, updateStories, cbIntents, cbActions } = this.props

        const allActionNames = cbActions.map((action)=>{
            return { text: action.name, value: action.name }
        })

        const allIntentNames = cbIntents.map((intent)=>{
            return { text: intent.intent, value: intent.intent }
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
                    render={props => <MasterEditStories {...props} cbStories={cbStories} updateStories={updateStories} allActionNames={allActionNames} allIntentNames={allIntentNames}/>}
                />
            </div>
        )
    }

}

export default Stories
import React, { Component } from 'react'
import EditStory from './EditStory'

class MasterEditStories extends Component {

    render() {
        const { cbStories, match, updateStories, allAvailableActions, allAvailableIntents } = this.props
        let index = match.params.topicId

        return (
            <EditStory
                story={cbStories[index]}
                allAvailableActions={allAvailableActions}
                allAvailableIntents={allAvailableIntents}
                updateStories={(newStory) => {
                    let stories = JSON.parse(JSON.stringify(cbStories))
                    stories[index] = newStory
                    updateStories(stories)
                }}
            />
        )
    }

}

export default MasterEditStories
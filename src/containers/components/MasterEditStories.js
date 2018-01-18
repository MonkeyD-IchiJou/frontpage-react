import React, { Component } from 'react'
import EditStory from './EditStory'

class MasterEditStories extends Component {

    render() {
        const { cbStories, match, updateStories, allActionNames, allIntentNames } = this.props

        let stories = JSON.parse(JSON.stringify(cbStories))
        let index = match.params.topicId
        let story = stories[match.params.topicId]

        return (
            <EditStory
                story={story}
                allActionNames={allActionNames}
                allIntentNames={allIntentNames}
                updateStories={(newStory) => {
                    stories[index] = newStory
                    updateStories(stories)
                }}
            />
        )
    }

}

export default MasterEditStories
import React, { Component } from 'react'
import EditEntity from './EditEntity'

class MasterEditEntities extends Component {
    render() {
        const { cbEntities, updateEntities, match } = this.props

        let entities = JSON.parse(JSON.stringify(cbEntities))
        let index = match.params.topicId
        let entity = entities[match.params.topicId]

        return (
            <EditEntity 
                entity={entity}
                updateEntities={(newEntity)=>{
                    // update this specific entity
                    entities[index] = newEntity
                    // then update my redux store
                    updateEntities(entities)
                }}
            />
        )
    }
}

export default MasterEditEntities
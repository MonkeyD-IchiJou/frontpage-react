import React, { Component } from 'react'
import EditEntity from './EditEntity'

class MasterEditEntities extends Component {
    render() {
        const { cbEntities, updateEntities, match } = this.props
        let index = match.params.topicId

        return (
            <EditEntity 
                entity={cbEntities[index]}
                updateEntities={(newEntity)=>{
                    // deep clone first
                    let entities = JSON.parse(JSON.stringify(cbEntities))
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
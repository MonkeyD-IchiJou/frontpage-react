import React, { Component } from 'react'
import { Dropdown, Grid, Header } from 'semantic-ui-react'

class EditIntentConditions extends Component {
    render() {
        const { intentConditions, allAvailableEntities, allAvailableEntityValues, updateIntentCondition } = this.props
        return (
            <Grid columns={3} verticalAlign='middle'>
                {
                    intentConditions.map((intentCondition, index)=>{
                        return (
                            <Grid.Row key={index} columns={3}>
                                <Grid.Column width={6}>
                                    <Dropdown
                                        value={intentCondition.entity}
                                        placeholder='Select Entity'
                                        fluid
                                        search
                                        selection
                                        options={allAvailableEntities}
                                        onChange={(e, { value }) => {
                                            updateIntentCondition({ entity: value, value: intentCondition.value }, index)
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                        <Header>Equal To: </Header>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Dropdown
                                        value={intentCondition.value}
                                        placeholder='Select Value'
                                        fluid
                                        search
                                        selection
                                        options={allAvailableEntityValues}
                                        onChange={(e, { value }) => {
                                            updateIntentCondition({ entity: intentCondition.entity, value: value }, index)
                                        }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        )
                    })
                }
            </Grid>
        )
    }
}

export default EditIntentConditions
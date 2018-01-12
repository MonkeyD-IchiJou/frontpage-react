import React, { Component } from 'react'
import { Table, Icon, Button } from 'semantic-ui-react'

class Stories extends Component {

    constructor(props) {
        super(props)

        // init my state at the very begining
        this.state = {
            stories: this.props.cbStories
        }
    }

    render() {

        let displayStories = this.state.stories.map((story, index) => {
            return (
                <Table.Row key={index}>

                    <Table.Cell>
                        {story.name}
                    </Table.Cell>

                    <Table.Cell>
                        <Button icon basic floated='right' size='small'>
                            <Icon name='write' />
                        </Button>
                    </Table.Cell>

                </Table.Row>
            )
        })

        return (
            <Table selectable>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Stories</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {displayStories}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='plus' /> Add Story
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>

            </Table>
        )
    }

}

export default Stories
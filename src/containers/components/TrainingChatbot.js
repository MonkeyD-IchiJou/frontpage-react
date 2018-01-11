import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'

class TrainingChatbot extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuItems: ['Intents', 'Entities', 'Actions', 'Stories']
        }
    }

    handleItemClick = (e, { name }) => {
        this.props.history.push(this.props.match.url + '/' + name)
    }

    render() {
        const { menuItems } = this.state
        let gs = this.props.history.location.pathname.split("/")
        let pathname = gs[5] // hardcoded magic number here.. whatever

        if (!pathname) {
            // if is undefined
            pathname = 'Intents'
        }

        return (
            <div>
                <Menu inverted pointing>
                    <Menu.Item name={menuItems[0]} active={pathname === menuItems[0]} onClick={this.handleItemClick} />
                    <Menu.Item name={menuItems[1]} active={pathname === menuItems[1]} onClick={this.handleItemClick} />
                    <Menu.Item name={menuItems[2]} active={pathname === menuItems[2]} onClick={this.handleItemClick} />
                    <Menu.Item name={menuItems[3]} active={pathname === menuItems[3]} onClick={this.handleItemClick} />
                </Menu>

                <Segment>
                    <Route
                        exact
                        path={`${this.props.match.url}/`}
                        render={props => <Segment>Intents</Segment>}
                    />

                    <Route
                        exact
                        path={`${this.props.match.url}/${menuItems[0]}`}
                        render={props => <Segment>Intents</Segment>}
                    />

                    <Route
                        path={`${this.props.match.url}/${menuItems[1]}`}
                        render={props => <Segment>Entities</Segment>}
                    />

                    <Route
                        path={`${this.props.match.url}/${menuItems[2]}`}
                        render={props => <Segment>Actions</Segment>}
                    />

                    <Route
                        path={`${this.props.match.url}/${menuItems[3]}`}
                        render={props => <Segment>Stories</Segment>}
                    />
                </Segment>

            </div>
        )
    }
}

export default TrainingChatbot
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Entities from './Entities'
import Intents from './Intents'
import Actions from './Actions'
import Stories from './Stories'
import { Menu } from 'semantic-ui-react'

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
        const { chatbotInfo } = this.props
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

                <Route
                    exact
                    path={`${this.props.match.url}/`}
                    render={props => <Intents {...props} cbIntents={chatbotInfo.intents} updateIntents={this.props.updateIntents}/>}
                />

                <Route
                    exact
                    path={`${this.props.match.url}/${menuItems[0]}`}
                    render={props => <Intents {...props} cbIntents={chatbotInfo.intents} cbEntities={chatbotInfo.entities} updateIntents={this.props.updateIntents}/>}
                />

                <Route
                    path={`${this.props.match.url}/${menuItems[1]}`}
                    render={props => <Entities {...props} cbEntities={chatbotInfo.entities} updateEntities={this.props.updateEntities}/>}
                />

                <Route
                    path={`${this.props.match.url}/${menuItems[2]}`}
                    render={props => <Actions {...props} cbActions={chatbotInfo.actions}/>}
                />

                <Route
                    path={`${this.props.match.url}/${menuItems[3]}`}
                    render={props => <Stories {...props} cbStories={chatbotInfo.stories} />}
                />

            </div>
        )
    }
}

export default TrainingChatbot
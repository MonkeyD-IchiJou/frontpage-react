import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import TrainingChatbot from './TrainingChatbot'
import MonitorChatbot from './MonitorChatbot'
import SettingChatbot from './SettingChatbot'
import { Menu, Icon, Segment } from 'semantic-ui-react'

class ChatbotConsole extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuItems: ['Settings', 'Trainings', 'Monitor']
        }
    }

    handleItemClick = (e, { name }) => {
        this.props.history.push(this.props.match.url + '/' + name)
    }

    render() {
        const { menuItems } = this.state
        const { chatbotInfo, history } = this.props
        let gs = history.location.pathname.split("/")
        let pathname = gs[4] // hardcoded magic number here.. whatever

        if (!pathname) {
            // if is undefined
            pathname = 'Settings'
        }

        return (
            <div>
                <Menu tabular attached='top'>
                    <Menu.Item name={menuItems[0]} active={pathname === menuItems[0]} onClick={this.handleItemClick}><Icon name='setting' /></Menu.Item>
                    <Menu.Item name={menuItems[1]} active={pathname === menuItems[1]} onClick={this.handleItemClick} />
                    <Menu.Item name={menuItems[2]} active={pathname === menuItems[2]} onClick={this.handleItemClick} />
                </Menu>

                <Segment attached='bottom' style={{
                    minHeight: '650px',
                    maxHeight: '650px'
                }}>
                    <Route
                        exact
                        path={`${this.props.match.url}/`}
                        render={props => <SettingChatbot {...props} />}
                    />

                    <Route
                        exact
                        path={`${this.props.match.url}/${menuItems[0]}`}
                        render={props => <SettingChatbot {...props} />}
                    />

                    <Route
                        path={`${this.props.match.url}/${menuItems[1]}`}
                        render={props => <TrainingChatbot {...props} />}
                    />

                    <Route
                        path={`${this.props.match.url}/${menuItems[2]}`}
                        render={props => <MonitorChatbot {...props} clientsOnlineList={chatbotInfo.clientsList}/>}
                    />

                </Segment>
            </div>
        )
    }
}

export default ChatbotConsole
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import MonitorLivechat from './MonitorLivechat'
import SettingLivechat from './SettingLivechat'
import { Menu, Icon, Segment, Label } from 'semantic-ui-react'

class ChatbotConsole extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuItems: ['Settings', 'Monitor', 'Logs']
        }
    }

    handleItemClick = (e, { name }) => {
        this.props.history.push(this.props.match.url + '/' + name)
    }

    render() {
        const { menuItems } = this.state
        const {
            livechatInfo,
            history,
            match,
            clientOnlineLists,
            selectCurrentClientToChatWith
        } = this.props
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
                    <Menu.Item name={menuItems[1]} active={pathname === menuItems[1]} onClick={this.handleItemClick}>
                        {menuItems[1]}<Label color='red' floating>{clientOnlineLists.length}</Label>
                    </Menu.Item>
                    <Menu.Item name={menuItems[2]} active={pathname === menuItems[2]} onClick={this.handleItemClick} />
                </Menu>

                <Segment attached='bottom' style={{
                    minHeight: '650px',
                    maxHeight: '1050px',
                    overflow: 'auto'
                }}>
                    <Route
                        exact
                        path={`${match.url}/`}
                        render={props => {
                            return (
                                <Redirect to={`${match.url}/${menuItems[0]}`} />
                            )
                        }}
                    />

                    <Route
                        exact
                        path={`${match.url}/${menuItems[0]}`}
                        render={props => <SettingLivechat livechatInfo={livechatInfo} />}
                    />

                    <Route
                        path={`${match.url}/${menuItems[1]}`}
                        render={
                            props => <MonitorLivechat clientOnlineLists={clientOnlineLists} selectCurrentClientToChatWith={selectCurrentClientToChatWith}/>
                        }
                    />

                    <Route
                        path={`${match.url}/${menuItems[2]}`}
                        render={props => <div>chatlogs</div>}
                    />

                </Segment>
            </div>
        )
    }
}

export default ChatbotConsole
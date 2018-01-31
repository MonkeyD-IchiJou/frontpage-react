import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Entities from './Entities'
import Intents from './Intents'
import Actions from './Actions'
import Stories from './Stories'
import CreateNewSubdomain from './CreateNewSubdomain'
import { Menu, Dropdown } from 'semantic-ui-react'

class TrainingChatbot extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuItems: ['Entities', 'Intents', 'Actions', 'Stories'],
            selectedSubdomains: 'Main',
        }
    }

    handleItemClick = (e, { name }) => {
        this.props.history.push(this.props.match.url + '/' + name)
    }

    render() {
        const { menuItems, selectedSubdomains } = this.state
        const {
            chatbotInfo,
            updateStories,
            updateIntents,
            updateEntities,
            updateActions,
            updateSubDomains,
            match,
            history
        } = this.props
        const { entities, intents, actions, stories, subDomains } = chatbotInfo
        let gs = history.location.pathname.split("/")
        let pathname = gs[5] // hardcoded magic number here.. whatever

        if (!pathname) {
            // if is undefined
            pathname = 'Entities'
        }

        let availableSubDomains = subDomains.map((SubDomain)=>{
            return { text: SubDomain.name, value: SubDomain.name }
        })

        availableSubDomains.push({
            text: 'Main',
            value: 'Main'
        })

        return (
            <div>
                <Menu inverted size='small'>

                    <Menu.Item>
                        <Dropdown
                            value={selectedSubdomains}
                            placeholder='Select SubDomain'
                            options={availableSubDomains}
                            onChange={(e, { value }) => {
                                this.setState({ selectedSubdomains: value })
                            }}
                        />
                        
                    </Menu.Item>

                    <Menu.Item>
                        <CreateNewSubdomain
                            selectedSubdomains={selectedSubdomains}
                            createNew={(subdomainName) => {
                                // create a new subDomains
                                let subsubDomains = JSON.parse(JSON.stringify(subDomains))
                                subsubDomains.push({ name: subdomainName, intents: [], actions: [], stories: [] })
                                updateSubDomains(subsubDomains)
                            }}
                            removeSubdomain={(subdomainName, index) => {
                                let subsubDomains = JSON.parse(JSON.stringify(subDomains))
                                subsubDomains.forEach((subsub, index) => {
                                    if (subsub.name === subdomainName) {
                                        subsubDomains.splice(index, 1)
                                    }
                                })
                                updateSubDomains(subsubDomains)
                                this.setState({ selectedSubdomains: 'Main' })
                            }}
                        />
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item name={menuItems[0]} active={pathname === menuItems[0]} onClick={this.handleItemClick} />
                        <Menu.Item name={menuItems[1]} active={pathname === menuItems[1]} onClick={this.handleItemClick} />
                        <Menu.Item name={menuItems[2]} active={pathname === menuItems[2]} onClick={this.handleItemClick} />
                        <Menu.Item name={menuItems[3]} active={pathname === menuItems[3]} onClick={this.handleItemClick} />
                    </Menu.Menu>

                </Menu>

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
                    path={`${match.url}/${menuItems[0]}`}
                    render={props => <Entities {...props} cbEntities={entities} updateEntities={updateEntities} />}
                />

                <Route
                    path={`${match.url}/${menuItems[1]}`}
                    render={props => <Intents {...props} cbIntents={intents} cbEntities={entities} updateIntents={updateIntents} />}
                />

                <Route
                    path={`${match.url}/${menuItems[2]}`}
                    render={props => <Actions {...props} cbActions={actions} updateActions={updateActions}/>}
                />

                <Route
                    path={`${match.url}/${menuItems[3]}`}
                    render={props => <Stories {...props} cbStories={stories} cbIntents={intents} cbActions={actions} cbEntities={entities} updateStories={updateStories}/>}
                />

            </div>
        )
    }
}

export default TrainingChatbot
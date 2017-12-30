import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Card, Icon, Feed } from 'semantic-ui-react'

class UsrDashboard extends Component {
    render() {
        const {userReducer} = this.props

        return (
            <Segment>

                <Card>
                    <Card.Content>
                        <Icon name='user' circular size='large' style={{ float: 'right' }} />
                        <Card.Header>
                            {userReducer.username}
                    </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {userReducer.userjoindate}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {userReducer.email}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='compose' />
                            {this.props.chatbotsReducer.length} chatbot
                            1 livechat
                        </a>
                    </Card.Content>
                </Card>

                <Card>
                    
                    <Card.Content>
                        <Card.Header>
                            Recent Activity
                        </Card.Header>
                    </Card.Content>

                    <Card.Content>
                        <Feed>

                            <Feed.Event>
                                <Feed.Label icon='user' />
                                <Feed.Content>
                                    <Feed.Date content='1 day ago' />
                                    <Feed.Summary>
                                        You created <a>a chatbot project</a> named <a>coworker</a>
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label icon='user' />
                                <Feed.Content>
                                    <Feed.Date content='1 day ago' />
                                    <Feed.Summary>
                                        You created <a>a livechat project</a> named <a>blah blah</a>
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                        </Feed>
                    </Card.Content>
                </Card>

            </Segment>
        )
    }
}

export default UsrDashboard
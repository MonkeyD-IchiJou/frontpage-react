import React, { Component } from 'react'
import { Header, Divider, Icon, Popup, Button } from 'semantic-ui-react'

class ConsoleHeader extends Component {
  render() {
    return (
      <div>
        <Divider hidden />

        <Header as='h4' floated='right' style={{ marginTop: '8px' }}>
          <Popup
            trigger={<Icon name='content' />}
            position='bottom right'
            flowing
            hoverable
            basic
          >
            <Button.Group basic vertical>
              <Button onClick={() => { this.props.history.push('/console') }}>Dashboard</Button>
              <Button>Doc</Button>
            </Button.Group>

            <Divider />

            <Button.Group vertical fluid>
              <Button color='blue' onClick={() => { this.props.ClickLogout() }}>
                <Icon name='sign out' />Logout
              </Button>
            </Button.Group>
          </Popup>
        </Header>

        <Header as='h2' floated='left'>
          <Header.Content>
            {this.props.title}
          </Header.Content>
        </Header>

        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </div>
    )
  }
}

export default ConsoleHeader
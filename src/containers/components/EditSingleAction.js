import React, { Component } from 'react'
import TextResponse from './../classes/TextResponse'
import ImageResponse from './../classes/ImageResponse'
import QuickReplies from './../classes/QuickReplies'
import TmpFormResponse from './../classes/TmpFormResponse'
import CustomResponse from './../classes/CustomResponse'
import LinkResponse from './../classes/LinkResponse'
import ResponseText from './ResponseText'
import ResponseLink from './ResponseLink'
import ResponseImage from './ResponseImage'
import ResponseQR from './ResponseQR'
import ResponseTmp from './ResponseTmp'
import ResponseCustom from './ResponseCustom'
import { Segment, Label, Popup, Icon, Button, Divider } from 'semantic-ui-react'

class EditSingleAction extends Component {

  render() {

    let actions = this.props.actions

    return (
      <Segment>

        <Label attached='top'>
          <Popup
            trigger={
              <Icon name='close' color='red' onClick={this.props.removeAction} style={{ float: 'right' }} />
            }
            content='Remove Action'
          />
        </Label>

        <Divider hidden />

        {actions.map((action, index) => {

          let torender = ''
          let title = ''
          let ua = (action) => {
            actions[index] = action
            this.props.updateActions(actions)
          }

          switch (action.type) {
            case 'TEXT':
              torender = (
                <ResponseText action={action} updateAction={ua} />
              )
              title = 'Text Response'
              break
            case 'QR':
              torender = (<ResponseQR action={action} updateAction={ua} />)
              title = 'Quick Replies'
              break
            case 'IMG':
              torender = (
                <ResponseImage action={action} updateAction={ua} />
              )
              title = 'Image Response'
              break
            case 'TMP':
              torender = (
                <ResponseTmp action={action} updateAction={ua} />
              )
              title = 'Tmp Response'
              break

            case 'LINK':
              torender = (
                <ResponseLink action={action} updateAction={ua} />
              )
              title = 'Link Response'
              break

            case 'CR':
              torender = (
                <ResponseCustom action={action} updateAction={ua} />
              )
              title = 'Custom Response'
              break

            default:
              break
          }

          return (
            <Segment key={index} raised>
              <Label attached='top'>
                {title}
                <Popup
                  trigger={
                    <Icon name='close' color='red' onClick={() => {
                      actions.splice(index, 1)
                      this.props.updateActions(actions)
                    }} style={{ float: 'right' }} />
                  }
                  content='Remove'
                />
              </Label>
              {torender}
            </Segment>
          )

        })}

        <Divider hidden />

        <Popup
          trigger={<Button>Add New Response</Button>}
          position='top center'
          hoverable
        >
          <Button.Group basic vertical>

            <Button onClick={() => {
              actions.push(new TextResponse(''))
              this.props.updateActions(actions)
            }}>
              Text
            </Button>

            <Button onClick={() => {
              actions.push(new QuickReplies([]))
              this.props.updateActions(actions)
            }}>
              Quick Replies
            </Button>

            <Button onClick={() => {
              actions.push(new ImageResponse(''))
              this.props.updateActions(actions)
            }}>
              Image
            </Button>

            <Button onClick={() => {
              actions.push(new LinkResponse(''))
              this.props.updateActions(actions)
            }}>
              Link
            </Button>

            <Button onClick={() => {
              actions.push(new TmpFormResponse())
              this.props.updateActions(actions)
            }}>
              TmpForm
            </Button>

            <Button onClick={() => {
              actions.push(new CustomResponse({}))
              this.props.updateActions(actions)
            }}>
              Custom
            </Button>

          </Button.Group>
        </Popup>

      </Segment>
    )
  }
}

export default EditSingleAction
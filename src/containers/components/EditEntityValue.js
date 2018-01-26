import React, { Component } from 'react'
import { Icon, Button, Input, Header, Grid, Table, Form } from 'semantic-ui-react'

class EditEntityValue extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            synonyms: []
        }

        if(this.props.value) {
            this.state = {
                name: this.props.value.name,
                synonyms: JSON.parse(JSON.stringify(this.props.value.synonyms))
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.value) {
            this.setState({
                name: nextProps.value.name,
                synonyms: JSON.parse(JSON.stringify(nextProps.value.synonyms))
            })
        }
    }

    render() {
        return(
            <div>{this.props.value.name}</div>
        )
    }

}

export default EditEntityValue
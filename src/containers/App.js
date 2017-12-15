import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setEnv_act } from './actions/envActions'
import { setUser_act } from './actions/userActions'

class App extends Component {

    componentDidMount() {
        this.props.setEnv_act()
        this.props.setUser_act()
    }

    render() {
        return (
            <div>
                this is my frontpage
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        envReducer: state.envReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEnv_act: () => {
            dispatch(setEnv_act())
        },
        setUser_act: () => {
            dispatch(setUser_act())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

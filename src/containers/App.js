import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setEnv_act } from './actions/envActions'
import { setUser_act } from './actions/userActions'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {

    componentDidMount() {
        this.props.setEnv_act()
        this.props.setUser_act()
    }

    render() {
        return (
            <BrowserRouter basename="/homepage/">
                <Switch>

                    <Route
                        exact
                        path='/'
                        render={props => <div>homepage pls</div>}
                    />

                    <Route
                        exact
                        path='/logout'
                        render={props => <div>logout pls</div>}
                    />

                    <Route
                        exact
                        path='/login'
                        render={props => <div>login pls</div>}
                    />

                </Switch>
            </BrowserRouter>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUrl_act } from './actions/envActions'
import { setUser_act } from './actions/userActions'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Loginpage from './components/Loginpage'
import Signuppage from './components/Signuppage'

class App extends Component {

    componentDidMount() {
        // first setup the correct url for backend server calling
        this.props.setUrl_act('https://localhost')
    }

    render() {
        return (
            <BrowserRouter basename="/homepage/">
                <Switch>

                    <Route
                        exact
                        path='/'
                        render={props => <Homepage {...props} />}
                    />

                    <Route
                        exact
                        path='/logout'
                        render={props => <div>logout page</div>}
                    />

                    <Route
                        exact
                        path='/login'
                        render={props => <Loginpage {...props} />}
                    />

                    <Route
                        exact
                        path='/signup'
                        render={props => <Signuppage {...props} />}
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
        setUrl_act: (backendurl) => {
            dispatch(setUrl_act(backendurl))
        },
        setUser_act: () => {
            dispatch(setUser_act())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

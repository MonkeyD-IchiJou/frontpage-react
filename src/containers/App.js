import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUrl_act } from './actions/envActions'
import { reqLogin_act, reqLogout_act } from './actions/userActions'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Loginpage from './components/Loginpage'
import Signuppage from './components/Signuppage'

class App extends Component {

    componentDidMount() {
        // first setup the correct url for backend server calling
        this.props.setUrl_act('https://localhost')
        this.props.reqLogin_act('ichijou8282@gmail.com', 'ichijou1234')
        //this.props.reqLogout_act()
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
        reqLogin_act: (email, password) => {
            dispatch(reqLogin_act(email, password)).catch(err=>{}) // simply catching error
        },
        reqLogout_act: () => {
            dispatch(reqLogout_act())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

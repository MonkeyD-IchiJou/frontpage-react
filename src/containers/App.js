import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUrl_act, setValidatingUser_act } from './actions/envActions'
import { reqLogin_act, reqLogout_act, reqUserInfo_act, reqCheckToken_act } from './actions/userActions'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage'
import Loginpage from './components/Loginpage'
import Signuppage from './components/Signuppage'
import Console from './Console'

const PrivateRoute = ({ component: Component, confirmLogin: loginornot, compProps: ComponentProps, ...rest }) => {

    return (
        <Route
            {...rest}
            render={
                props => (
                    loginornot ? (<Component {...props} {...ComponentProps} />) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
                )
            }
        />
    )

}

class App extends Component {

    componentDidMount() {

        // at the very beginning, I am first validating the user

        // simple set the backend url
        this.props.dispatch(setUrl_act('https://localhost')).then(async () => {

            try {

                // see whether got jwt token stored in the storage or not
                await this.props.dispatch(reqCheckToken_act())

                let backendUrl = this.props.envReducer.backendUrl
                let jwt = this.props.userReducer.jwt

                // get user info based on jwt
                await this.props.dispatch(reqUserInfo_act(backendUrl, jwt))

                // finish validating the user
                this.props.dispatch(setValidatingUser_act(false))

            } catch (e) {
                // finish validating the user
                this.props.dispatch(setValidatingUser_act(false))
            }
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        // do not update my component if i am validating the user
        return !nextProps.envReducer.validatingUser
    }

    ClickLogout = () => {
        // user log out
        this.props.dispatch(reqLogout_act())
    }

    ClickLogin = async (email, password, successCB, errorCB) => {

        // loading screen start
        this.props.dispatch(setValidatingUser_act(true))

        try {

            let backendUrl = this.props.envReducer.backendUrl

            // user login request
            await this.props.dispatch(reqLogin_act(backendUrl, email, password))

            // get user info based on jwt
            await this.props.dispatch(reqUserInfo_act(backendUrl, this.props.userReducer.jwt))

            // finish loading
            this.props.dispatch(setValidatingUser_act(false))

            // login successfully liao
            successCB()

        } catch (e) {

            // finish loading
            this.props.dispatch(setValidatingUser_act(false))

            // login error, componenet callback do something about it
            errorCB(e.toString())
        }
    }

    render() {

        // If i am not validating the user
        if (!this.props.envReducer.validatingUser) {

            // whether this user has really logged in before
            let confirmLogin = this.props.userReducer.uservalidate

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
                            path='/login'
                            render={props => <Loginpage {...props} ClickLogin={this.ClickLogin} />}
                        />

                        <Route
                            exact
                            path='/signup'
                            render={props => <Signuppage {...props} />}
                        />

                        <PrivateRoute
                            path='/console'
                            component={Console}
                            confirmLogin={confirmLogin}
                            compProps={{ ClickLogout: this.ClickLogout }}
                        />

                    </Switch>
                </BrowserRouter>
            )
        }
        else{
            return(
                <div>
                    Validating User.. loading screen
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        envReducer: state.envReducer,
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(App)


import React, { lazy } from 'react'

import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom"



import ProtectedRouteAdmin from './ProtectedRouteAdmin'
import ProtectedRouteAuth from './ProtectedRouteAuth'

const Admin = lazy( () => import( "../pages/admin/Admin" ) )
const Login = lazy( () => import( "../pages/auth/login/Login" ) )
const Registration = lazy( () => import( "../pages/auth/reg/Registration" ) )


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/admin" />
                <ProtectedRouteAdmin path="/admin" component={ Admin } />
                <ProtectedRouteAuth path="/login" component={ Login } />
                <ProtectedRouteAuth path="/registration" component={ Registration } />
                <Redirect exact from="/*" to="/admin" />
            </Switch>
        </Router>
    )
}

export default Routes

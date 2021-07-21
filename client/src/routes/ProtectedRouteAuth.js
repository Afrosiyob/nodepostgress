import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRouteAuth = ( { component: Component, ...rest } ) => {
    const token = localStorage.getItem( "token" )
    return (
        <Route
            { ...rest }
            render={ ( props ) =>
                !token ?
                    ( <Component { ...props } /> ) :
                    ( <Redirect
                        to={ {
                            pathname: "/admin",
                            state: { from: props.location }
                        } }
                    /> )
            }
        />
    )
}

export default ProtectedRouteAuth

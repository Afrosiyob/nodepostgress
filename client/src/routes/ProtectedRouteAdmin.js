import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRouteAdmin = ( { component: Component, ...rest } ) => {
    const token = localStorage.getItem( "token" )
    return (
        <Route
            { ...rest }
            render={ ( props ) =>
                token ?
                    ( <Component { ...props } /> ) :
                    ( <Redirect
                        to={ {
                            pathname: "/login",
                            state: { from: props.location }
                        } }
                    /> )
            }
        />
    )
}

export default ProtectedRouteAdmin

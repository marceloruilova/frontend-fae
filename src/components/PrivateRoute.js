import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
    const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            // not logged in so redirect to login page with the return url
            return <Redirect to="login" />
        }
        // check if route is restricted by role
        if (roles ) {
            // role not authorised so redirect to home page
            roles.find(element => {
                element!==user.role&&<Redirect to="login" />           
            });
            
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
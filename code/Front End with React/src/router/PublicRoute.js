import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/isLogin';



/**
 * Hook for public route that user can access without authentication
 * 
 */
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        /**
         * restricted = false meaning public route
         * restricted = true meaning restricted route
          */
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/HomePage" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
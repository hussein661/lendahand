import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './components/Home'



const PrivateRoute = ({ component: Component, title, basic,roles, ...rest }) => {
        return(
            <Route {...rest} render={(props) => (
                    <Component {...props} />
            )}/>  
        )
            }

    return (
        <Route {...rest} render={(props) => (
                
                    <Component {...props} />
 
            
                
        )}/>
    )


const PublicRoute = ({ component: Component, ...rest }) => {
    const is_logged_in = Store.is_logged_in();
    const path = rest.path;
    if ((path === "/signin" || path === "/register") && is_logged_in) {
        return <Redirect to='/' />
    }
    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
        )}/>
    )
}
  
function NoMatch({ location }) {
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
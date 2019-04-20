import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import PostAProblem from "./pages/PostAProblem";
import FeedBack from "./pages/FeedBack";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";


const MyRoute = ({ component: Component}) => {
  return (
      <div>
      <Navbar />
      <Route  render={props => <Component {...props} />} />
      </div>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <MyRoute exact path="/" component={Home} />
        <MyRoute exact path="/postAProblem" component={PostAProblem} />
        <MyRoute exact path="/feedBack" component={FeedBack} />
        <MyRoute exact path="/profile" component={Profile} />
        <MyRoute exact path="/LogIn" component={LogIn} />
        <MyRoute exact path="/Register" component={Register} />




      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

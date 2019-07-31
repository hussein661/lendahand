import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import PostAProblem from "./pages/PostAProblem";
import FeedBack from "./pages/FeedBack";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import PostEdit from "./components/PostEdit";
import PostDonate from "./components/PostDonate";

const isLoggedIn = () => {
  const token = localStorage.getItem("API_TOKEN")
  if(token !== null && token.length > 10){
    return true
  }
}

const MyRoute = (MyRouteProps) => {
  const Component = MyRouteProps.component
  const publicRoute = MyRouteProps.publicRoute ? true : false
  const params = MyRouteProps.computedMatch.params
  return (
      <div>
      <Navbar isLoggedIn={isLoggedIn}/>
      {(isLoggedIn() || publicRoute) ? 
      <Route  render={originalRouteProps => <Component {...originalRouteProps} params={params} />} />
      :
      <Route  render={originalRouteProps => <LogIn {...originalRouteProps} />} />
    }
      </div>
  );
};



const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <MyRoute exact path="/" component={Home} publicRoute  />
        <MyRoute exact path="/postAProblem" component={PostAProblem} />
        <MyRoute exact path="/feedBack" component={FeedBack} />
        <MyRoute exact path="/profile" component={Profile} />
        <MyRoute exact path="/LogIn" component={LogIn} publicRoute/>
        <MyRoute exact path="/Register" component={Register} publicRoute />
        <MyRoute exact path="/problem/:problemId" component={PostEdit} />
        <MyRoute exact path="/problem/donate/:problemId" component={PostDonate} />

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

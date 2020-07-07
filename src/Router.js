import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import Users from "./user/User";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./helper/PrivateRoute";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";

const Router = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/post/create" component={NewPost} />
        <Route path="/post/:postId" component={SinglePost} />
        <PrivateRoute path="/post/edit/:postId" component={EditPost} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute path="/findpeople" component={FindPeople} />
        <PrivateRoute path="/user/:userId" component={Profile} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Router;

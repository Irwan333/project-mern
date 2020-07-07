import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  // props means components passed down to this pricate route component
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

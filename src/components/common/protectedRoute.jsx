import React from "react";
import { Redirect, Route } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = (props) => {
  const { path, component: Component, render, ...rest } = props;
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;

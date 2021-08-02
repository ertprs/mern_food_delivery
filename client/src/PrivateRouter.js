import { isAuth } from "./helper";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props) => {
  return isAuth() ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};

export const RouterLink = (props) => {
  return isAuth() ? (
    <Redirect to="/" />
  ) : (
    <Route exact={props.exact} path={props.path} component={props.component} />
  );
};

import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Clase from "./Clase";
import Register from "./Register";
import Login from "./Login";
import {useUser} from "../context/UserProvider";

function Routes(props) {
    const {user, loadingUser} = useUser();
    const RouteSesions = (props) =>
        user ? <Redirect to="/"/> : <Route {...props} />;
    const SecureRoute = (props) => {
        return user ? <Route {...props} /> : <Redirect to="/login"/>;
    }
    return (
        <Switch>
            <SecureRoute path="/" exact component={Clase}/>
            {!loadingUser ? <RouteSesions path="/login" exact component={Login}/> : null}
            {!loadingUser ? <RouteSesions path="/register" exact component={Register}/> : null}
            {!loadingUser ? <SecureRoute path="/clase" exact component={Clase}/> : null}
        </Switch>
    );
}

export default Routes;
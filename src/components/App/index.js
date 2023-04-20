import React from "react";
import { 
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Navigation from "../Navigation";
import Landing from "../Landing";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import PasswordForget from "../PasswordForget";
import Home from "../Home";
import Account from "../Account";
import Admin from "../Admin";

import withAuthentication from "../Session/withAuthentication";

import * as ROUTES from "../../constants/routes";

import styles from "./styles.module.css";

const App = () => {
    return (
        <Router>
            <Navigation/>
            <hr/>
            <div className={styles.main}>
                <Routes>
                    <Route exact path={ROUTES.LANDING} Component={Landing}/>
                    <Route path={ROUTES.SIGN_UP} Component={SignUp}/>
                    <Route path={ROUTES.SIGN_IN} Component={SignIn}/>
                    <Route path={ROUTES.PASSWORD_FORGET} Component={PasswordForget}/>
                    <Route path={ROUTES.HOME} Component={Home}/> 
                    <Route path={ROUTES.ACCOUNT} Component={Account}/>
                    <Route path={ROUTES.ADMIN} Component={Admin}/>       
                </Routes>
            </div>
        </Router>
    )
}

export default withAuthentication(App);
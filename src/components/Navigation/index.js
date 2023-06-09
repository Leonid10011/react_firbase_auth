import React from "react";
import { Link } from "react-router-dom";

import SignOut from "../SignOut";
import * as ROUTES from "../../constants/routes";

import styles from "./styles.module.css";
import { AuthUserContext } from "../Session";

const Navigation = ({ authUser }) => {
    return(
        <div>
            <AuthUserContext.Consumer>
                { authUser => authUser ? <NavigationAuth/> : <NavigationNonAuth/> }
            </AuthUserContext.Consumer>
        </div>
    )
}



const NavigationAuth = () => {
    return(
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <SignOut/>
            </li>
        </ul>
    )
};

const NavigationNonAuth = () => {
    return(
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>   
            </li>
        </ul>
    )
}

export default Navigation;
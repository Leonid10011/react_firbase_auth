import React from "react";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { PasswordForgetLink } from "../PasswordForget";

const SignIn = () => {
    return (
        <div>
            <h1>SignIn</h1>
            <SignInForm/>
            <PasswordForgetLink/>
            <SignUpLink/>
        </div>
    )
}

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

function SignInBase ({ firebase }) {
    const [creds, setCreds] = React.useState(INITIAL_STATE);
    const [isInvalid, setIsInvalid] = React.useState(true);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        firebase
        .doSignInWithEmailAndPassword(creds.email, creds.password)
        .then(() => {
            setCreds(INITIAL_STATE);
            navigate("../"+ROUTES.HOME);
        });
    };

    const onChange = (event) => {
        setCreds({...creds, [event.target.name]: event.target.value});
        setIsInvalid((creds.email === '' || creds.password === ''));
    };

    return (
        <form  onSubmit={onSubmit}>
            <input
                name="email"
                value={creds.email}
                onChange={onChange}
                type="text"
                placeholder="Email Adress"
            />
            <input
                name="password"
                value={creds.password}
                onChange={onChange}
                type="text"
                placeholder="Password"
            />
            <button disabled={isInvalid}>
                Sign In
            </button>

            {creds.error && <p>{creds.error.message}</p>}
        </form>
    )
}

const SignInForm = withFirebase(SignInBase);

export default SignIn;
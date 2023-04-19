import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const SignUp = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm/>
    </div>
)

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

function SignUpFormBase ({ firebase }) {
    const [creds, setCreds] = React.useState(INITIAL_STATE);
    const [isInvalid, setIsInvalid] = React.useState(true);
    const navigate = useNavigate();

    const onSubmit = event => {
        firebase
            .doCreateUserWithEmailAndPassword(creds.email, creds.passwordOne)
            .then(authUser => {
                setCreds(INITIAL_STATE);
                navigate("../"+ ROUTES.HOME)
            })
            .catch(error => {
                setCreds({...creds, error});
            });
        event.preventDefault();
    }

    const onChange = event => {
        setCreds({...creds, [event.target.name]: event.target.value});
        let testInvalid =
            creds.passwordOne !== creds.passwordTwo ||
            creds.passwordOne === '' || 
            creds.email === '' ||
            creds.username === '';

        setIsInvalid(testInvalid);
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={creds.username}
                onChange={onChange}
                type="text"
                placeholder="Username"
            />
            <input
                name="email"
                value={creds.email}
                onChange={onChange}
                type="text"
                placeholder="Email Adress"
            />
            <input
                name="passwordOne"
                value={creds.passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={creds.passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Sign Up</button>
            {creds.error && <p>{creds.error.message}</p>}
        </form>
    );
};

const SignUpForm = withFirebase(SignUpFormBase);

const SignUpLink = () => {
    return ( 
        <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
    );
}

export default SignUp;
export { SignUpForm, SignUpLink }
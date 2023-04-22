import React from "react";
import { Link } from "react-router-dom";

import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";

function PasswordForget () {
    return(
        <div>
            <h1>PasswordForget</h1>
            <PasswordForgetForm/>
        </div>
    )
}

const INITIAL_STATE = {
    email: '',
    error: null
}

function PasswordForgetFormBase (props) {
    const [pfState, setPfState] = React.useState(INITIAL_STATE);
    const [isInvalid, setIsInvalid] = React.useState(true);

    React.useEffect(() => {
        let invalid = pfState.email === '';
        setIsInvalid(invalid);
    }, [pfState.email])

    const onSubmit = event => {
        event.preventDefault();
        props.firebase
            .doPasswordReset(pfState.email)
            .then(() => {
                setPfState({...INITIAL_STATE});
            }) 
            .catch(error => {
                setPfState({error});
            });
    }

    const onChange = event => {
        setPfState({...pfState, [event.target.name]: event.target.value});
    };

    return(
        <form onSubmit={onSubmit}>
            <input
                name='email'
                value={pfState.email}
                onChange={onChange}
                type='text'
                placeholder='Email Adress'
            />
            <button disabled={isInvalid} type='submit'>
                Reset My Password
            </button>

            {pfState.error && <p>{pfState.error.message}</p>}
        </form>
    );
}

function PasswordForgetLink () {
    return(
        <p>
            <Link to={"../"+ ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
        </p>
    )
};

export default PasswordForget;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
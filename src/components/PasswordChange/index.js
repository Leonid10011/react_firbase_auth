import React from "react";

import { withFirebase } from "../Firebase";

const PasswordChange = () => {
    <div>
        <h1>PasswordChange</h1>
        <PasswordChangeForm/>
    </div>
}

const INITIAL_STATE= {
    passwordOne: '',
    passwordTwo: '',
    error: null
}

function PasswordChangeFormBase (props) {
    const [pcState, setPcState] = React.useState(INITIAL_STATE);
    const [isInvalid, setIsInvalid] = React.useState(true);

    React.useEffect(() => {
        let invalid = (pcState.passwordOne === '' || pcState.passwordTwo === '');
        console.log(invalid)
        setIsInvalid(invalid);
    }, [pcState.passwordOne, pcState.passwordTwo]);

    const onSubmit = (event) => {
        props.firebase
            .doPasswordUpdate(pcState.passwordOne)
            .then(() => {
                setPcState(INITIAL_STATE);
            })
            .catch((error) => {
                setPcState({ error });
            });

        event.preventDefault();
    }

    const onChange = event => {
        setPcState({ ...pcState, [event.target.name]: event.target.value });
        event.preventDefault()
    };

    return(
        <form onSubmit={onSubmit} >
            <input
                name="passwordOne"
                value={pcState.passwordOne}
                type='password'
                onChange={onChange}
                placeholder='New Password'
            />
            <input
                name="passwordTwo"
                value={pcState.passwordTwo}
                type='password'
                onChange={onChange}
                placeholder='Confirm new Password'
            />
            <button disabled={isInvalid} type='submit'>
                Change Password
            </button>
            {pcState.error && <p>{pcState.error.message}</p>}
        </form>
    )
}


export default PasswordChange;

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export { PasswordChangeForm }

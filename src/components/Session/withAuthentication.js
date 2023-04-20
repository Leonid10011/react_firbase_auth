import React from "react";

import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";

const withAuthentication = Component => {
    const Test = props => {
        const [authUser, setAuthUser] = React.useState(null);
    
        React.useEffect(() => {
            console.log("JKL", props)
            props.firebase.auth.onAuthStateChanged(authUser => {
                authUser ?
                    setAuthUser({ ...authUser })
                    : setAuthUser(null);
            });
        },[]);
    
        return(
            <AuthUserContext.Provider value={authUser}>
                <Component {...props}/>
            </AuthUserContext.Provider>
        )

    }
    return withFirebase(Test);
}

export default withAuthentication;


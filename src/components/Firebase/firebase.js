import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import * as CREDS from "../../config";

const firebaseConfig = {

  apiKey: CREDS.REACT_APP_API_KEY,

  authDomain: CREDS.REACT_APP_AUTH_DOMAIN,

  projectId: CREDS.REACT_APP_PROJECT_ID,

  storageBucket: CREDS.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: CREDS.REACT_APP_MESSAGING_SENDER_ID,

  appId: CREDS.REACT_APP_ID

};


class Firebase {

    constructor() {
      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
    }

    // *** AUTH API *** //
    doCreateUserWithEmailAndPassword = ( email, password ) => 
      createUserWithEmailAndPassword(this.auth, email, password);

    doSignInWithEmailAndPassword = ( email, password ) => 
      signInWithEmailAndPassword(this.auth, email, password);
    

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => 
      this.auth.currentUser.updatePassword(password);
  }

export default Firebase;
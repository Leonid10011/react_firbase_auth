import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './components/App';
import Firebase from './components/Firebase';
import FirebaseContext from './components/Firebase/context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <App/>
    </FirebaseContext.Provider>
);

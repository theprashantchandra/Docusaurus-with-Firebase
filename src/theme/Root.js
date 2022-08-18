import React, {useState} from 'react';
import {handleSubmission, logout, auth} from './firebase';
import '../css/login.css';
import Loading from './Loading';

// Default implementation, that you can customize
export default function Root({children}) {
  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  auth.onAuthStateChanged(async function(user) {
    if (user !== null) {
      setUserAuth(user);
    }

    setAuthLoading(false);
  });

  const isAllow = () => {
    return userAuth?.email;
  };

  if (authLoading) {
    return (
      <>
        <Loading />
        <div style={{display: 'none'}}>{children}</div>
      </>
    );
  }

  return (
    <React.Fragment>
      {isAllow() ? (
        <>{children}</>
      ) : (
        <div className="login">
          <div className="login__container">
            <button className="login__btn login__google" onClick={handleSubmission}>
              Login with Google
            </button>
            Email : <input type="text" />
            Passward : <input type="text" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

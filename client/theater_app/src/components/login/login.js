import React from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();

  const handleGoogleLogin = () => {
    loginWithPopup({ connection: 'google-oauth2' })
      .then(() => {
        // Handle successful Google login
        console.log('Successfully logged in with Google');
      })
      .catch((error) => {
        // Handle Google login errors
        console.error('Google login error:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect()}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

const App = () => {
  return (
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_AUTH0_CLIENT_ID"
      redirectUri={window.location.origin}
    >
      <Login />
    </Auth0Provider>
  );
};

export default App;

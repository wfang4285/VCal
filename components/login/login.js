import React from 'react';
import './global.css'

export default function loginPage() {
    function handleLogin(e){
        e.preventDefault();
    }
    function handleGoogleLogin(){
        console.log("Logging in with Google!")
    }
    return(
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <button onClick={handleGoogleLogin} className="google-login-button">Login with Google</button>
      </div>
    </div>
  );
}
import React from 'react';
import './global.css'

export default function loginPage() {

    //state to toogle between login and new user registration
    const [isLoginView, setIsLoginView] = useState(true);

    const handleLogin(e){
        e.preventDefault();
        console.log("Logging in with username and password...")
    };

    //manage registration submission
    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Registering new user...")
    };

    function handleGoogleLogin(){
        console.log("Logging in with Google!")
    }

    const renderLoginForm = () => (
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
      );

    const renderRegisterForm = () => (
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="new-username">Username:</label>
            <input type="text" id="new-username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="new-password">Password:</label>
            <input type="password" id="new-password" name="password" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
    );
    return(
    <div className="login-page">
      <div className="login-container">
        <h2>{isLoginView ? 'Login' : 'Register'}</h2>
        {isLoginView ? renderLoginForm() : renderRegisterForm()}
        <button onClick={() => setIsLoginView(!isLoginView)} className="toggle-btn">
          {isLoginView ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
        {isLoginView && (
          <button onClick={handleGoogleLogin} className="google-login-btn">Login with Google</button>
        )}
      </div>
    </div>
  );   
};

export default LoginPage;
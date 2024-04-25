import React from 'react';
import './global.css'

export default function loginPage() {

    //state to toogle between login and new user registration
    const [isLoginView, setIsLoginView] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin(e){
        e.preventDefault();
        console.log("Logging in with username and password...")
    };

    //manage registration submission
    const handleRegister = (e) => {
        e.preventDefault();
        if (validatePassword(password)) { 
          console.log("Registering new user...");
        } else {
          alert("Please ensure your password meets all the requirements."); 
        }
    };

    function handleGoogleLogin(){
        console.log("Logging in with Google!")
    }

    const handlePasswordChange = (e) => { 
      const newPass = e.target.value;
      setPassword(newPass); 
      validatePassword(newPass); 
    };

    const validatePassword = (password) => { 
      const requirements = [
        { regex: /.{8,}/, message: "Password must be at least 8 characters long." },
        { regex: /[0-9]/, message: "Password must contain at least one number." },
        { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter." },
        { regex: /[^A-Za-z0-9]/, message: "Password must contain at least one special character." }
      ];
      
      const failed = requirements.filter(req => !req.regex.test(password));
      if (failed.length === 0) {
        setPasswordError(''); 
        return true;
      } else {
        setPasswordError(failed.map(req => req.message).join(' ')); 
        return false;
      }
    };
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
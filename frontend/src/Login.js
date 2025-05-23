import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Navbar from './Navbar';
import axios from 'axios';
import './Login.css';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isCaptchaRendered, setIsCaptchaRendered] = useState(false);

  useEffect(() => {
    // Load the reCAPTCHA script when the component mounts
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Define onloadCallback function
  window.onloadCallback = function () {
    if (!isCaptchaRendered) {
      window.grecaptcha.render('recaptcha-container', {
        sitekey: '6LcrER0qAAAAAA4WRO_5h0UU8Dlya0jzC1fUPSxF', // Replace with your site key
        callback: function (response) {
          console.log("CAPTCHA Response:", response); // For debugging purposes
        }
      });
      setIsCaptchaRendered(true);
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the reCAPTCHA response
    const response = window.grecaptcha.getResponse();
    if (!response) {
      alert("Please complete the CAPTCHA challenge.");
      return;
    }

    // Send the login request with the token
    axios.post('http://192.168.29.229:8019/login', { ...values, captchaToken: response })
      .then(response => {
        if (response.data.success) {
          login(); // Set authentication state
          navigate('/dashboard'); // Redirect to dashboard
        } else {
          setError(response.data.message); // Show error message
        }
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred. Please try again.'); // Show generic error message
      });
  };

  return (
    <div>
      <Navbar />
      <div className='container bg-primary'>
        <div className='form-container'>
          <h2>Login</h2>
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" placeholder='Enter Email' name='email' className='form-control rounded-0' onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={handleChange} />
            </div>
            <div className="mb-3" id="recaptcha-container"></div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
            <div className="mt-3">
              <p>Don't have an account?</p>
              <button type="button" className="btn btn-primary w-100 rounded-0" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

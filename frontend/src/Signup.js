import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Signup.css';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isCaptchaRendered, setIsCaptchaRendered] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    window.onloadCallback = function() {
        if (!isCaptchaRendered) {
            window.grecaptcha.render('recaptcha-container', {
                sitekey: '6LcrER0qAAAAAA4WRO_5h0UU8Dlya0jzC1fUPSxF',
                callback: function(response) {
                    console.log("CAPTCHA Response:", response);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = window.grecaptcha.getResponse();
        if (!response) {
            alert("Please complete the CAPTCHA challenge.");
            return;
        }

        axios.post('http://192.168.29.229:8019/signup', { ...values, captchaToken: response })
            .then(res => {
                if (res.data.success) {
                    alert("Registered successfully");
                    window.location.href = '/login';
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Navbar />
            <div className='container bg-primary'>
                <div className='form-container'>
                    <h2>Sign-Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input
                                type="text"
                                placeholder='Enter Name'
                                name='name'
                                className='form-control rounded-0'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                type="email"
                                placeholder='Enter Email'
                                name='email'
                                className='form-control rounded-0'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                type="password"
                                placeholder='Enter Password'
                                name='password'
                                className='form-control rounded-0'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3" id="recaptcha-container"></div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                        <p>You agree to our <a href="/terms-and-policies" className='text-decoration-none'>terms and policies</a></p>
                        <div className="mt-3">
                            <p>Already have an account?</p>
                            <button type="button" className="btn btn-primary w-100 rounded-0" onClick={() => window.location.href = '/login'}>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

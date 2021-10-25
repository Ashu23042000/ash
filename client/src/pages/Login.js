import React from 'react';
import Navbar from '../components/Navbar';
import "../css/login.css";

const Login = () => {
    return (
        <>
            <Navbar />
            <div className="form">
                <form action="/login" method="POST" className="login-form">
                    <i className="fas fa-user-circle"></i>
                    <input type="email" className="user-input" placeholder="Email" name="email" required />
                    <input type="password" className="user-input" placeholder="Password" name="password"
                        required />
                    {/* <div className="option-1">
                                <a href="#">Forgot Password</a>
                            </div> */}
                    <button type="submit" className="btn">Login</button>
                    <div className="option-2">
                        <p>Not Registered ? <a href="/signup">Create an Account</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login

import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../components/Navbar';
import "../css/login.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getEmail = (e) => {
        setEmail(e.target.value);
    }

    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    // const data = { email, password };

    const submitForm = (e) => {
        e.preventDefault();
        
        axios.get("http://localhost:5000/")
            .then((response) => {
                console.log(response.status);
            }).catch((err) => {
                console.log(err);
            });
    }







    return (
        <>
            <Navbar />
            <div className="form">
                <form className="login-form">
                    <i className="fas fa-user-circle"></i>
                    <input type="email" className="user-input" placeholder="Email" name="email" required value={email} onChange={getEmail} />
                    <input type="password" className="user-input" placeholder="Password" name="password"
                        required value={password} onChange={getPassword} />
                    {/* <div className="option-1">
                                <a href="#">Forgot Password</a>
                            </div> */}
                    <button type="submit" className="btn" onClick={submitForm}>Login</button>
                    <div className="option-2">
                        <p>Not Registered ? <a href="/signup">Create an Account</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from "axios";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "../css/login.css";


const Login = () => {


    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getEmail = (e) => {
        setEmail(e.target.value);
    }

    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    const data = { email, password };

    const submitForm = (e) => {

        if (email && password) {
            e.preventDefault();
            axios.post("http://localhost:5000/login", data)
                .then((response) => {
                    if (response.status === 200) {
                        swal(response.data.message, "", "success");
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                        history.push("/people");
                    } else if (response.status === 201) {
                        swal(response.data.message, "Try again", "error");
                    } else {
                        swal(response.data.message, "Try again", "error");
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
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
                        <p>Not Registered ?<Link to="/signup">Create an Account</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;

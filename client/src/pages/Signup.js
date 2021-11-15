import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from "axios";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import "../css/signup.css";

const Signup = () => {

    const history = useHistory();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState("");
    const [level, setLevel] = useState("");
    const [profession, setProfession] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const data = { name, email, level, profession, password, confirmPassword };


    const submitForm = (e) => {
        if (name && email && level && profession && password && confirmPassword) {
            e.preventDefault();
            axios.post("http://localhost:5000/signup", data)
                .then((response) => {
                    if (response.status === 200) {
                        swal(response.data, "Login now", "success");
                        history.push("/login");
                    } else if (response.status === 201) {
                        swal(response.data, "Try with another email", "error");
                        console.log(response.data);
                    } else {
                        swal(response.data, "Try again", "error");
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    const getName = (e) => {
        setName(e.target.value);
    }
    const getEmail = (e) => {
        setEmail(e.target.value);
    }
    const getLevel = (e) => {
        setLevel(e.target.value);
    }
    const getProfession = (e) => {
        setProfession(e.target.value);
    }
    const getPassword = (e) => {
        setPassword(e.target.value);
    }
    const getConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <>
            <Navbar />
            <div className="form">
                <form className="login-form">
                    <i className="fas fa-user-plus"></i>
                    <input type="text" className="user-input" placeholder="Username" name="name" required onChange={getName} />
                    <input type="email" className="user-input" placeholder="Email" name="email" required onChange={getEmail} />
                    <select name="level" className="selectBox" required onChange={getLevel}>
                        <option value="">Select Level</option>
                        <option value="Low">Low</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <select name="profession" className="selectBox" required onChange={getProfession}>
                        <option value="">Select Profession</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="password" className="user-input" placeholder="Password" name="password"
                        required onChange={getPassword} />
                    <input type="password" className="user-input" placeholder="Confirm Password"
                        name="confirmPassword" required onChange={getConfirmPassword} />
                    <button type="submit" className="btn" onClick={submitForm}>Signup</button>
                    <div className="option-1">
                        <p>Already Registered? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;

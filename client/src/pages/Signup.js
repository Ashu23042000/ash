import React from 'react'
import Navbar from '../components/Navbar';

import "../css/signup.css";

const Signup = () => {
    return (
        <>
            <Navbar />
            <div className="form">
                <form action="/signup" method="POST" className="login-form">
                    <i className="fas fa-user-plus"></i>
                    <input type="text" className="user-input" placeholder="Username" name="name" required />
                    <input type="email" className="user-input" placeholder="Email" name="email" required />
                    <select name="level" className="selectBox" required>
                        <option value="">Select Level</option>
                        <option value="Low">Low</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <select name="profession" className="selectBox" required>
                        <option value="">Select Profession</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="password" className="user-input" placeholder="Password" name="password"
                        required />
                    <input type="password" className="user-input" placeholder="Confirm Password"
                        name="confirmPassword" required />
                    <button type="submit" className="btn">Signup</button>
                    <div className="option-1">
                        <p>Already Registered? <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup

import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {

    const [toggle, settoggle] = useState(false);

    const showMenu = () => {
        settoggle(!toggle);
    }

    return (
        <>
            <div className="navbar">
                <div className="container navbar_wraper">
                    <div className="brand">
                        <h2>ASHAPP</h2>
                    </div>
                    <div className="navMenu">
                        <ul>
                            <li><Link to="/" >Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link> </li>
                        </ul>
                    </div>
                    <div className={`hamburger ${toggle ? 'show' : null}`} onClick={showMenu} >
                        <i className="fal fa-bars hamburger_img"></i>
                    </div>
                </div>
            </div>

            <div className={`hamburger_navMenu ${toggle ? 'show' : null}`}  >
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar

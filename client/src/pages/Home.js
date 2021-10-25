import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../css/home.css";
import background from "../img/video-chat-background3.jpg";



const Home = () => {
    return (
        <>
            <Navbar />
            <main className="main">
                <div className="backImg">
                    <img src={background} alt="" />

                </div>
                <div className="sideContent">
                    <h1>Improve Your English</h1>
                    <p>You can speak english fluently by doing practice of speaking english daily.Talk with a people through
                        live video call.</p>

                    <a href="/people"><button>Start</button></a>

                    {/* <p>Don't have an account <a href="/signup">Signup</a></p>  */}
                </div>
            </main>
            <Footer />

        </>
    )
}

export default Home

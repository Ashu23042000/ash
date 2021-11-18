import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import { Socket } from "../App";
import UserCard from '../components/UserCard';
import "../css/people.css";
import Peer from "simple-peer";


// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5000");

const People = () => {

    const socket = useContext(Socket);
    const history = useHistory();

    const [users, setUsers] = useState();
    // const [mySocketId, setMySocketId] = useState();
    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        const user = localStorage.getItem("user");

        socket.emit("meConnected", JSON.parse(user));

        socket.on("me", (id) => {
            console.log(`My socket id is ${id}`)
            setMe(id);
        });




        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });


        socket.on("connectedUsers", (data) => {
            setUsers(data);
        });


        socket.on("someOneCallingYou", async function (data) {
            // console.log(`${data.from} calling you`);
            // alert(`${data.from} calling you`);

            setIdToCall(data.to);
            let answer = await swal(`${data.from} wants to talk with you.`, {
                buttons: ["Decline", "Accept"],
            });


            if (answer) {
                history.push(`/chat/${data.to}/${data.fromSocketId}`);
            }
            socket.emit("answer", { answer, from: data.fromSocketId });


        });

        // showing call request reply of other user-----
        socket.on("requestReply", async (data) => {
            console.log(data);
            if (data.answer) {
                // let res = await fetch(`/call/${data.from}`, { method: "GET" });
                // window.location.href = res.url;
                history.push(`/chat/${data.to}/${data.from}`);
                swal("Answer you", "", "success", {
                    button: "Ok",
                });
                // callUser(idToCall);
            } else {
                swal("Didn't answer you", "", "error", {
                    button: "Ok",
                });
                // alert(`Didn't answer you`);
            }
        });
    }, [socket]);






    return (
        <>
            <Navbar />
            <div className="users_grid">
                {users && Object.values(users).map((user) => {
                    return <UserCard name={user.name} level={user.level} profession={user.profession} id={user._id} socket_id={user.socketId} mySocketId={me} />
                })}
            </div>
            <div className="video-container">
                <div className="video">
                    {stream && < video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                </div>
                <div className="video">
                    {callAccepted && !callEnded ?
                        <video autoPlay playsInline ref={userVideo} style={{ width: "300px" }} /> :
                        null
                    }
                </div>
            </div>
        </>
    )
}

export default People

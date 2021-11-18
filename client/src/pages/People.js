import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import { Socket } from "../App";
import UserCard from '../components/UserCard';
import "../css/people.css";
import Peer from "simple-peer";



const People = () => {

    const socket = useContext(Socket);
    const history = useHistory();
    const user = localStorage.getItem("user");
    const loginUser = JSON.parse(user);

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
                // history.push(`/chat/${data.to}/${data.fromSocketId}`);
                setCallAccepted(true);
            }
            socket.emit("answer", { answer, from: data.fromSocketId });


        });

        // showing call request reply of other user-----
        socket.on("requestReply", async (data) => {
            console.log(data);
            if (data.answer) {

                swal("Answer you", "", "success", {
                    button: "Ok",
                });
                setCallAccepted(true);

                // making video call-------


                navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
                    setStream(stream);
                    // myVideo.current.srcObject = stream;
                });

                callUser(idToCall);
                answerCall();

            } else {
                swal("Didn't answer you", "", "error", {
                    button: "Ok",
                });
            }
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });


    }, [socket]);


    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                signalData: data,
                userToCall: id,
                from: me,
                name: name
            });
        });


        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;

    }

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        });

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;

    }

    socket.on("endCallByUser", () => {
        setCallEnded(true);
    })

    const leaveCall = () => {
        socket.emit("endCallByUser", idToCall);
        setCallEnded(true);
        connectionRef.current.destroy();
    }






    const makeCall = (id, fromId) => {
        console.log(`Make call to ${id}`);
        socket.emit("callRequest", { to: id, from: loginUser.name, fromSocketId: fromId });
    };







    return (
        <>
            <Navbar />
            {!callAccepted ? <div className="users_grid">
                {users && Object.values(users).map((user) => {
                    console.log(user)
                    // return <UserCard name={user.name} level={user.level} profession={user.profession} id={user._id} socket_id={user.socketId} mySocketId={me} />
                    return (loginUser._id !== user._id ? < div className="users" >
                        <h2>{user.name}</h2>
                        <div>
                            <span>
                                {user.profession}
                            </span>
                            <span>
                                {user.level}
                            </span>
                        </div>

                        <button className="callBtn" onClick={() => { makeCall(user.socketId, me) }}>
                            <span>Start Conversation</span>
                            {/* <input value=${JSON.stringify({ key: key, from: from, fromUserName: fromUserName })} type="hidden"></input> */}
                        </button>
                    </div> : <div style={{ display: "none" }}></div>
                    )
                })}
            </div> :
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
            }

        </>
    )
}

export default People

import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import { Socket } from "../App";
import UserCard from '../components/UserCard';
import "../css/people.css";

// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5000");

const People = () => {

    const socket = useContext(Socket);
    const history = useHistory();

    const [users, setUsers] = useState();
    // const [mySocketId, setMySocketId] = useState();
    const [me, setMe] = useState("");



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


            let answer = await swal(`${data.from} wants to talk with you.`, {
                buttons: ["Decline", "Accept"],
            });


            if (answer) {
                history.push("/chat");
            }
            socket.emit("answer", { answer, from: data.fromSocketId });


        });

        // showing call request reply of other user-----
        socket.on("requestReply", async (data) => {
            console.log(data);
            if (data.answer) {
                // let res = await fetch(`/call/${data.from}`, { method: "GET" });
                // window.location.href = res.url;
                history.push("/chat");
                swal("Answer you", "", "success", {
                    button: "Ok",
                });
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
        </>
    )
}

export default People

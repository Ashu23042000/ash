require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const path = require("path");
const db = require("./db");
db();
const session = require("express-session");
const mongoDbStore = require("connect-mongo");
const flash = require("express-flash");
const port = process.env.PORT || 5000;
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(cors());



// ----------------------------------------session config-----------------------------------------

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    store: mongoDbStore.create({ mongoUrl: process.env.DB_URL, collectionName: "sessions" }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(flash());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// -------------------------------------------deployment-------------------------------------------

__dirname = path.resolve();

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running");
    });
}


// -------------------------------------------routes-------------------------------------------

const login = require("./routes/login");
app.use("/login", login);

const signup = require("./routes/signup");
app.use("/signup", signup);


// -------------------------------------------socket.io-------------------------------------------

let usersConnected = {};

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("endCallByUser", (id) => {
        io.to(id).emit("endCallByUser");
    });


    socket.on("disconnect", () => {
        delete usersConnected[socket.id];
        io.emit("connectedUsers", usersConnected);
    });

    socket.on("meConnected", (data) => {
        data.socketId = socket.id;
        if (!usersConnected[data.id]) {
            usersConnected[socket.id] = data;
        }
        io.emit("connectedUsers", usersConnected);
        // console.log(usersConnected);
    });


    socket.on("callRequest", (data) => {

        io.to(data.to).emit("someOneCallingYou", { from: data.from, fromSocketId: data.fromSocketId })
    });

    // sending request reply to user----
    socket.on("answer", (data) => {
        console.log(data);
        io.to(data.from).emit("requestReply", data);
    });

});



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
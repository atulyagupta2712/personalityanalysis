const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const mongodb = require("mongodb");
const socket = require('socket.io');
const port = process.env.PORT || 3000;
let users;
let count;
let chatRooms;
let messagesArray = [];


const app = express();

const config = require('./config/db');

mongoose.connect(config.dbPath);
mongoose.connection.on('connected', ()=>{
    console.log("connection created "+config.dbPath);
});
mongoose.connection.on('error', err=>{
    console.log("Error is "+err);
})

const userRoute = require("./routes/userRoutes");
const teacherRoute = require('./routes/teacherRoutes');
const MongoClient = mongodb.MongoClient;

// Allowing cross-origin sites to make requests to this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});


app.use(cors());
app.use(bodyParser.json());


// app.listen(port, ()=>{
//     console.log("Server started");
// });


app.use(express.static(path.join(__dirname, "public")));

MongoClient.connect(config.dbPath, (err, Database) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log("Connected to MongoDB");
    const db = Database.db("personalitydb"); 
    users = db.collection("users"); // getting the users collection
    chatRooms = db.collection("chats"); /* getting the chatRooms collection. 
                                       This collection would store chats in that room*/
    // chats = db.collection("chats");
    
    // starting the server on the port number 3000 and storing the returned server variable 
    const server = app.listen(port, () => {
        console.log("Server started on port " + port + "...");
    });
    const io = socket.listen(server);

    /* 'connection' is a socket.io event that is triggered when a new connection is 
       made. Once a connection is made, callback is called. */
    io.sockets.on('connection', (socket) => { /* socket object allows us to join specific clients 
                                                to chat rooms and also to catch
                                                and emit the events.*/
        // 'join event'
        socket.on('join', (data) => {          
            socket.join(data.room);
            chatRooms.find({}).toArray((err, rooms) => {
                if(err){
                    console.log(err);
                    return false;
                }
                count = 0;
                rooms.forEach((room) => {
                    if(room.name == data.room){
                        count++;
                    }
                });
                // Create the chatRoom if not already created
                if(count == 0) {
                    chatRooms.insert({ name: data.room, messages: [] }); 
                }
            });
        });
        // catching the message event
        socket.on('message', (data) => {
            console.log("node data", data);
            // emitting the 'new message' event to the clients in that room
            io.in(data.room).emit('new message', {user: data.user, message: data.message});
            // save the message in the 'messages' array of that chat-room
            chatRooms.update({name: data.room}, { $push: { messages: { user: data.user, message: data.message } } }, (err, res) => {
                if(err) {
                    console.log(err);
                    return false;
                }
            });
        });
        // Event when a client is typing
        socket.on('typing', (data) => {
            // Broadcasting to all the users except the one typing 
            socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
        });
    });

}); 
app.get('/chatroom/:room', (req, res, next) => {
    let room = req.params.room;
    chatRooms.find({name: room}).toArray((err, chatroom) => {
        console.log("node chatroom",chatroom)
        if(err) {
            console.log(err);
            return false;
        }
        if(chatroom[0])
        res.json(chatroom[0].messages);
        else
        res.json(null)
    });
});


app.get("/", (request, response)=>{
    response.send("hey user");
});

app.use("/userRoute", userRoute);

app.use("/teacherRoute", teacherRoute);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
import "./App.css"
import React ,{useState} from 'react'
import io from "socket.io-client"
import Chart from "./Components/Chat/Chat.js"

const socket = io.connect("https://saiteja-vmessenger.herokuapp.com/");

function App() {
    const [username,setUsername] = useState("")
    const [room,setRoom] = useState("")
    const [showChat,setShowChat] = useState(false)

    const joinRoom = ()=>{
        if(username !== "" && room !==""){
            socket.emit("join_room",room)
            setShowChat(true)
        }
    }

    return (
        <div className="App">
            {!showChat ? (
            <div className="chat-container">
                <h1 className="heading">Join A Chat</h1>  
                <input type="text"  placeholder="Enter Your Name" onChange={(event)=>{
                    setUsername(event.target.value)    
                }} />
                <input type="text" placeholder="Enter Your Room ID" onChange={(event)=>{
                    setRoom(event.target.value)    
                }}/>
                <button onClick={joinRoom} className="button-join">Join Now</button>
            </div>
            )
                :
            (
            <Chart socket={socket} username={username} room={room}/>
            )}        
        </div>
    )
}

export default App

import React,{useState,useEffect} from 'react'
import "./Chat.css"
import ScrollToBottom from "react-scroll-to-bottom"

function Chat(props) {
    const {socket,username,room} = props
    const[currentMessage,setCurrentMessage] = useState("")
    const[messageList,setMessageList] = useState([])
    
    const sendMessage = async (event) =>{
        event.preventDefault()
        
        if(currentMessage !== ""){
            const messageData ={
                room:room,
                owner:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message",messageData)
            setMessageList((prevList)=>[...prevList,messageData])
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive_message",(data)=>{
            setMessageList((prevList)=>[...prevList,data])
            
        })
        
    }, [socket])
    console.log(messageList)

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p className="paragraph">V messenger</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((eachMessage,index)=>{ 
                    return(
                        <div className="message" key={index} id={username === eachMessage.owner ? "you":"other"}>
                            <div>
                                <div className="message-content">
                                    <p className="message-paragraph">{eachMessage.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p className="content">{eachMessage.time}</p>
                                    <p className="content-name">{eachMessage.owner}</p>
                                </div>
                            </div>

                        </div>
                    )
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" value={currentMessage} placeholder="Say Hi..." onChange={(event)=>{
                    setCurrentMessage(event.target.value)
                }}
                onKeyPress={(event)=>{
                    event.key === "Enter" && sendMessage(event);
                }}
                />
                <button onClick={sendMessage} className="send-button">
                <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    )
}

export default Chat 


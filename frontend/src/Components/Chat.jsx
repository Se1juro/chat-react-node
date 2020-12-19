import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client";
import {messageServices} from "../Services/messageServices";

function Chat(user) {
    const socket = io('//localhost:4042');
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        getMessages();
        socket.emit('join', user)
    }, [user]);
    useEffect(() => {
        socket.on('mensajes', mensaje => {
            setMessages([...messages, mensaje]);
        })
        return () => {
            socket.off()
        }
    }, [messages]);
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({behavior: 'smooth'})
    })
    const getMessages = async () => {
        const res = await messageServices.getMessages();
        if (res.status === 200) {
            console.log(res.data)
            setMessages(res.data)
        }
    }
    const submitMessage = (e) => {
        e.preventDefault();
        socket.emit('mensaje', {user, message});
    }
    return (
        <div className={"container-chat"}>
            <h1>Chat</h1>
            <div className={"container-show-messages"}>
                {messages.map((message, index) =>
                    <div key={index} className={"remitente"}>{message.user} <span
                        className={"rol"}>({message.role}):</span> <span className={"mensaje"}>{message.message}</span>
                    </div>
                )}
                <div ref={divRef}/>
            </div>
            <form onSubmit={submitMessage} id={"form-mensaje"}>
                <label htmlFor="" style={{color: "white"}}>Escribe un mensaje aquí </label>
                <textarea name="" id="" cols="30" rows="10" onChange={e => setMessage(e.target.value)}
                          value={message}/>
                <input type={"submit"} value={"enviar"}/>
            </form>
        </div>
    );
}

export default Chat;
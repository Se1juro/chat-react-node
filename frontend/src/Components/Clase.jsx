import React from 'react';
import Chat from "./Chat";
import {useUser} from "../context/UserProvider";

function Clase(props) {
    const {user, logout} = useUser()

    return (
        <div className={"container-home"}>

            <div className="container">
                <div className="container-logout" onClick={logout}>
                    <h3>Cerrar Sesión X</h3>
                </div>
                <h1>Clase Virtual - Estudiante {user.name} {user.lastname}</h1>
                <iframe className={"video-clase"} src="https://www.youtube.com/embed/xGXRjiseVaE?autoplay=1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </div>
            <Chat user={user}/>

        </div>
    );
}

export default Clase;
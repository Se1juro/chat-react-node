import React, {useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {useUser} from "../context/UserProvider";
import {NavLink} from "react-router-dom";

function Login(props) {
    const {login} = useUser();
    const optionsToast = {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    }
    const [datos, setDatos] = useState([]);
    const handleInputChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmitForm = async (e) => {
        e.preventDefault();
        const res = await login(datos);
        console.log(res)
        if (res===true) {

            props.history.push("/clase");
        } else {
            toast.error(res, optionsToast);
        }
    }
    return (
        <div className={"contenedor-register"}>
            <h1>Iniciar Sesión</h1>
            <form id="form-register" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="name">Usuario</label>
                    <input type="text" required name={"username"} onChange={handleInputChange}
                           placeholder={"Ingresa tu usuario"}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Contraseña</label>
                    <input type="password" required name={"password"} onChange={handleInputChange}
                           placeholder={"Ingresa tu contraseña"}/>
                </div>
                <NavLink to={"/register"}>¿No tienes cuenta? Registrate aquí</NavLink>
                <input type="submit" value={"Iniciar Sesión"}/>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Login;
import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useUser} from "../context/UserProvider";
import {NavLink} from "react-router-dom";

function Register(props) {
    const {register} = useUser();
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
        const res = await register(datos);
        if (res === true) {
            toast.success("Se ha registrado el usuario", optionsToast);
            props.history.push("/clase")
        } else {
            if (res.errors) {
                for (const error of res.data.errors) {
                    toast.error(Object.values(error)[0], optionsToast);
                }
            } else {
                toast.error(res.message, optionsToast);
            }
        }
    }
    return (
        <div className={"contenedor-register"}>
            <h1>Registro de estudiantes</h1>
            <form id="form-register" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="name">Nombre del estudiante</label>
                    <input type="text" name={"name"} required onChange={handleInputChange}
                           placeholder={"Ingresa tu nombre"}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Apellido del estudiante</label>
                    <input type="text" name={"lastname"} required onChange={handleInputChange}
                           placeholder={"Ingresa tu apellido"}/>
                </div>
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
                <NavLink to={"/login"}>¿Tienes cuenta? Inicia Sesión aquí</NavLink>

                <input type="submit" value={"Registrarse"}/>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Register;
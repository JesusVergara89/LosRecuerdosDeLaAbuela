import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {


    const [show, setShow] = useState(false)



    const showPass = () => {
        setShow(!show)
    }
    return (
        <div className="login">
            <div className="container-login">
                <h2>Iniciar sesión</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type={show === false ? "password" : "text"} id="password" name="password" required />
                        <i onClick={showPass} className={`bx  ${show === false ? 'bxs-show' : 'bxs-hide'}`}></i>
                    </div>
                    <button type="submit" className="btn">Iniciar sesión</button>
                </form>
            </div>
        </div>

    );
};

export default Login;
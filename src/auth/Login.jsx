import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handlelogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            toast(error.message, { type: 'error' });
        }
    }

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
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type={show === false ? "password" : "text"}
                            id="password"
                            name="password"
                            required
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <i onClick={showPass} className={`bx  ${show === false ? 'bxs-show' : 'bxs-hide'}`}></i>
                    </div>
                    <button onClick={handlelogin} className="btn">Iniciar sesión</button>
                </form>
            </div>
            <div className="login-register">
                <Link to='/register'>¿No tienes cuenta? - Registrate</Link>
            </div>
        </div>
    );
};

export default Login;
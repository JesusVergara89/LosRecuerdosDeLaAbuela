import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
    const [user] = useAuthState(auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            toast(error.message, { type: 'error' });
        }
    };

    const showPass = () => {
        setShow(!show);
    };

    return (
        <div className="login">
            {user &&
                <p>You are already logged in!</p>
            }
            {!user &&
                <div className="container-login">
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i onClick={showPass} className={`bx ${show ? 'bxs-hide' : 'bxs-show'}`}></i>
                        </div>
                        <button className="btn">Iniciar sesión</button>
                    </form>
                </div>
            }
            {!user &&
                <div className="login-register">
                    <Link to='/register'>¿No tienes cuenta? - Regístrate</Link>
                </div>
            }
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';

const Register = () => {

  const [user] = useAuthState(auth)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const registerFunct = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/login');
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  };

  const toggleShowPassword = () => {
    setShow(!show);
  };

  return (
    <div className="register">
      {user &&
        <p>You are already logged in!</p>
      }
      {!user &&
        <div className="container-register">
          <h2>Registro</h2>
          <form onSubmit={registerFunct}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <i onClick={toggleShowPassword} className={`bx ${show ? 'bxs-hide' : 'bxs-show'}`}></i>
            </div>
            <button className="btn" type="submit">Registrarse</button>
          </form>
        </div>
      }
      {!user &&
        <div className="register-login">
          <Link to='/login'>¿Ya tienes cuenta? - Accede</Link>
        </div>
      }
    </div>
  );
};

export default Register;

import React, { useState } from 'react'
import '../styles/Register.css'
import { Link } from 'react-router-dom'

const Register = () => {


  const [show, setShow] = useState(false)



  const showPass = () => {
    setShow(!show)
  }
  return (
    <div className="register">
      <div className="container-register">
        <h2>Registro</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type={show === false ? "password" : "text"} id="password" name="password" required />
            <i onClick={showPass} className={`bx  ${show === false ? 'bxs-show' : 'bxs-hide'}`}></i>
          </div>
          <button type="submit" className="btn">Registrarse</button>
        </form>
      </div>
      <div className="register-login">
                <Link to='/login'>¿Ya tienes cuenta? - Accede</Link>
            </div>
    </div>

  )
}

export default Register
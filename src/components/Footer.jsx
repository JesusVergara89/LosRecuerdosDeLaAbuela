import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="contact-container">
                <h3>Contacto</h3>
                <p>Correo: ejemplo@mail.com</p>
                <p>Teléfono: 123456789</p>
                <p>Dirección: Calle Ejemplo, Ciudad</p>
            </div>
            <div className="social-container">
                <h3>Redes Sociales</h3>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Instagram</a></li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer
import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="contact-container">
                <h3>Contacto</h3>
                <p>Correo: recuerdosdeabuelahillo@gmail.com</p>
                <p>Teléfono: +52 662 469 8604</p>
                <p>Hermosillo - Sonora, México</p>
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
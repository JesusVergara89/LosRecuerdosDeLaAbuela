import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="contact-container">
                <h3>Contacto</h3>
                <p>Correo: elbauldelaabuela78@gmail.com</p>
                <p>Teléfono: +52 662 469 8604</p>
                <p>Hermosillo - Sonora, México</p>
            </div>
            <div className="social-container">
                <h3>Redes Sociales</h3>
                <ul>
                    <li><a href="https://www.facebook.com/people/Mar%C3%ADa-Cuevas/pfbid0fJpNLdzv3EzR7xtoQ6wU45ys2B38CivYdCfTujmEgaH6sd7ZKWmGpeXrL1Sr4oJGl/?mibextid=LQQJ4d&rdid=RI91fWmD2xN0hmvi&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FcPxwwzfa3UNkotAr%2F%3Fmibextid%3DLQQJ4d" target="_blank">Facebook</a></li>
                    <li><a href="https://www.tiktok.com/@el.bal.de.la.abue8" target="_blank">Tik Tok</a></li>
                    <li><a href="https://www.instagram.com/elbauldelaabuela7" target="_blank">Instagram</a></li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer
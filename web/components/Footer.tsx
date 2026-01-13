export default function Footer() {
    return (
        <footer id="contacto">
            <div className="container footer-content">
                <div className="footer-info">
                    <h3>Diego Andrés Rojas Vargas</h3>
                    <p>Santiago, Chile</p>
                    <p>diegoandresrojasvargas@gmail.com</p>
                </div>
                <div className="socials">
                    <a href="https://linkedin.com/in/diego-rojas-vargas-a85579125" target="_blank" title="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/Drojasva" target="_blank" title="GitHub"><i className="fa-brands fa-github"></i></a>
                    <a href="mailto:diegoandresrojasvargas@gmail.com" title="Email"><i className="fa-solid fa-envelope"></i></a>
                </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '20px', opacity: 0.5, fontSize: '0.8rem' }}>&copy; 2026 Diego Rojas. Todos los derechos reservados.</p>
        </footer>
    );
}

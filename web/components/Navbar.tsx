import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="logo">Diego<span className="dot">.</span>Rojas</div>
            <nav>
                <ul>
                    <li><Link href="#inicio">Inicio</Link></li>
                    <li><Link href="#experiencia">Experiencia</Link></li>
                    <li><Link href="#proyectos">SID v2.0</Link></li>
                    <li><Link href="#contacto" className="btn-nav">Contactar</Link></li>
                </ul>
            </nav>
        </header>
    );
}

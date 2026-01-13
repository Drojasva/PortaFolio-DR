import Link from 'next/link';

export default function Hero() {
    return (
        <section id="inicio" className="hero">
            <div className="hero-content">
                <span className="greeting">Hola, soy Diego Rojas</span>
                <h1>Tech Lead & <br /> <span className="gradient-text">Full Stack Engineer</span></h1>
                <p>Especialista en arquitectura de software y transformación digital industrial. Lidero el desarrollo de sistemas críticos (SID v2.0) usando Next.js 15 y PostgreSQL.</p>
                <div className="hero-btns">
                    <Link href="#proyectos" className="btn primary">Ver Proyectos</Link>
                    <a href="https://linkedin.com/in/diego-rojas-vargas-a85579125" target="_blank" className="btn secondary">LinkedIn</a>
                </div>
            </div>
            <div className="hero-visual">
                <div className="circle-blur"></div>
            </div>
        </section>
    );
}

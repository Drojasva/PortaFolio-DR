export default function Skills() {
    return (
        <section id="skills" className="container section-padding">
            <h2 className="section-title">Stack Tecnológico</h2>
            <div className="skills-grid">
                <div className="skill-card">
                    <i className="fa-brands fa-react"></i>
                    <h3>Modern Frontend</h3>
                    <p>Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, MUI v6</p>
                </div>
                <div className="skill-card">
                    <i className="fa-solid fa-database"></i>
                    <h3>Backend & Data</h3>
                    <p>Node.js, PostgreSQL, Prisma ORM, Zod Validation, SQL Avanzado</p>
                </div>
                <div className="skill-card">
                    <i className="fa-solid fa-server"></i>
                    <h3>Infra & DevOps</h3>
                    <p>PM2, Scripting (Bash), Linux/Windows Server, Redes Industriales</p>
                </div>
                <div className="skill-card">
                    <i className="fa-solid fa-users-gear"></i>
                    <h3>Liderazgo</h3>
                    <p>Code Review, Dirección Técnica, Arquitectura de Software, Scrum</p>
                </div>
            </div>
        </section>
    );
}

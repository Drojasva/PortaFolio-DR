'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectModal from './ProjectModal';

export default function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="proyectos" className="container section-padding">
            <h2 className="section-title">Experiencia Destacada</h2>

            <div className="projects-grid">
                <article className="project-card">
                    <div className="card-image">
                        <Image
                            src="/images/sid-login.png"
                            alt="Sistema Integrado de Gestión - Login"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="card-content">
                        <h3>Sistema Integrado de Gestión (SID v2.0)</h3>
                        <p>Transformación digital completa para planta industrial. Migración de legacy a arquitectura moderna, gestionando KPIs críticos (OEE, OTIF) en tiempo real.</p>
                        <div className="tags">
                            <span>Next.js 15</span><span>Prisma</span><span>PostgreSQL</span>
                        </div>
                        <button
                            onClick={() => {
                                console.log('Click Ver Arquitectura');
                                setIsModalOpen(true);
                            }}
                            className="btn-link"
                            style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
                        >
                            Ver Arquitectura <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </article>

                <article className="project-card">
                    <div className="card-image">
                        <div className="img-placeholder" style={{ background: '#222' }}></div>
                    </div>
                    <div className="card-content">
                        <h3>Infraestructura On-Premise</h3>
                        <p>Implementación de automatización mediante PM2 y scripting avanzado para sincronización de Timezones y alta disponibilidad 24/7.</p>
                        <div className="tags">
                            <span>Bash</span><span>PM2</span><span>Redes</span>
                        </div>
                        <a href="#" className="btn-link">Ver Detalles <i className="fa-solid fa-server"></i></a>
                    </div>
                </article>

                <article className="project-card">
                    <div className="card-image">
                        <div className="img-placeholder" style={{ background: '#333' }}></div>
                    </div>
                    <div className="card-content">
                        <h3>Digitalización & Telemetría</h3>
                        <p>Integración de I-Site y eliminación de papel en procesos GDA. Dashboards de toma de decisiones gerenciales.</p>
                        <div className="tags">
                            <span>React 19</span><span>ECharts</span><span>IoT</span>
                        </div>
                        <a href="#" className="btn-link">Ver Impacto <i className="fa-solid fa-chart-line"></i></a>
                    </div>
                </article>
            </div>
        </section>
    );
}

'use client';
import { useState, useEffect } from 'react';

type Tab = 'overview' | 'architecture' | 'dataflow' | 'stack';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isVisible ? 'open' : ''}`} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="modal-content">
                <header className="modal-header">
                    <h2>
                        <i className="fa-solid fa-industry" style={{ color: 'var(--primary)' }}></i>
                        SID v2.0 - Arquitectura Técnica
                    </h2>
                    <button className="close-btn" onClick={onClose} aria-label="Cerrar">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </header>

                <div className="modal-body">
                    <aside className="modal-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <i className="fa-solid fa-bolt"></i> Visión & Reto
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                            onClick={() => setActiveTab('architecture')}
                        >
                            <i className="fa-solid fa-server"></i> Sistema Completo
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'dataflow' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dataflow')}
                        >
                            <i className="fa-solid fa-arrows-rotate"></i> Flujo de Datos
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'stack' ? 'active' : ''}`}
                            onClick={() => setActiveTab('stack')}
                        >
                            <i className="fa-solid fa-code"></i> Stack Detallado
                        </button>
                    </aside>

                    <main className="tab-content">
                        {/* Tab 1: Overview */}
                        <div className={`tab-pane ${activeTab === 'overview' ? 'active' : ''}`}>
                            <h3 style={{ marginBottom: '20px' }}>Transformación Digital Industrial</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                                Migración monolítica exitosa de sistemas legacy fragmentados a una plataforma unificada y robusta.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div style={{ background: 'rgba(255,100,100,0.1)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,100,100,0.2)' }}>
                                    <h4 style={{ color: '#f87171', marginBottom: '10px' }}><i className="fa-solid fa-triangle-exclamation"></i> El Problema</h4>
                                    <ul className="feature-list">
                                        <li>Procesos manuales en papel propensos a error humano.</li>
                                        <li>Latencia de horas para obtener KPIs de producción (OEE).</li>
                                        <li>Flas de sincronización entre equipos de mantenimiento y operaciones.</li>
                                    </ul>
                                </div>
                                <div style={{ background: 'rgba(59,130,246,0.1)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.2)' }}>
                                    <h4 style={{ color: '#60a5fa', marginBottom: '10px' }}><i className="fa-solid fa-check-circle"></i> La Solución</h4>
                                    <ul className="feature-list">
                                        <li>Digitalización 100% con formularios PWA responsivos.</li>
                                        <li>Dashboards en Tiempo Real (Next.js SSR + SWR).</li>
                                        <li>Sistema de alertas automático (Node.js + Websockets/Polling).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Tab 2: Architecture */}
                        <div className={`tab-pane ${activeTab === 'architecture' ? 'active' : ''}`}>
                            <h3 style={{ textAlign: 'center' }}>Arquitectura de Alto Nivel</h3>
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.9rem' }}>
                                Patrón Cliente-Servidor con API RESTful optimizada para entornos industriales.
                            </p>

                            <div className="arch-diagram">
                                <div className="arch-layer">
                                    <h4>Capa de Presentación (Frontend)</h4>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Next.js 15 (App Router)</div>
                                    <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Material UI v6 • Apache ECharts • React 19</p>
                                </div>

                                <div className="arch-layer">
                                    <h4>Capa de Negocio (Backend API)</h4>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Node.js + Express</div>
                                    <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>JWT Auth • Winston Logger • PM2 Custodiado</p>
                                </div>

                                <div className="arch-layer">
                                    <h4>Capa de Datos</h4>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>PostgreSQL + Prisma ORM</div>
                                    <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>50+ Tablas Relacionales • Índices Optimizados</p>
                                </div>

                                <div className="arch-layer" style={{ borderStyle: 'dashed', borderColor: 'var(--text-muted)' }}>
                                    <h4>Capa Física (Planta)</h4>
                                    <div style={{ fontSize: '1rem' }}>Sensores IoT • Tablets Operarios • PCs Industriales</div>
                                </div>
                            </div>
                        </div>

                        {/* Tab 3: Data Flow */}
                        <div className={`tab-pane ${activeTab === 'dataflow' ? 'active' : ''}`}>
                            <h3>Flujo Crítico: Sincronización 5W ↔ Tareas</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                                Ejemplo de consistencia de datos compleja entre módulos aislados.
                            </p>

                            <div style={{ background: '#000', padding: '20px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f0' }}>
                                <p><span style={{ color: '#888' }}>// 1. Trigger: Cierre de Tarea en Portal Kanban</span></p>
                                <p>PATCH /api/tareas/TK-421 {'{ progress: 100 }'}</p>
                                <br />
                                <p style={{ color: '#888' }}>// 2. Backend Logic (Controller)</p>
                                <p>const task = await prisma.sid_tareas.update(...);</p>
                                <p>if (task.tags.includes('5W-ACCION')) {'{'}</p>
                                <p>&nbsp;&nbsp;const actionId = extractId(task.tags);</p>
                                <p>&nbsp;&nbsp;<span style={{ color: '#f0f' }}>// Sincronización Automática</span></p>
                                <p>&nbsp;&nbsp;await prisma.analisis_5w_acciones.update({'{'}</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;where: {'{'} id: actionId {'}'},</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;data: {'{'} estado: 'cerrada', fecha_cierre: new Date() {'}'}</p>
                                <p>&nbsp;&nbsp;{'}'});</p>
                                <p>{'}'}</p>
                                <br />
                                <p><span style={{ color: '#888' }}>// 3. Result</span></p>
                                <p>&gt; Data Consistency Verified. Sync Complete.</p>
                            </div>
                        </div>

                        {/* Tab 4: Stack */}
                        <div className={`tab-pane ${activeTab === 'stack' ? 'active' : ''}`}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                <div>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', borderBottom: '1px solid var(--primary)' }}>Frontend</h4>
                                    <ul className="feature-list" style={{ fontSize: '0.9rem' }}>
                                        <li><strong>Core:</strong> Next.js 15.5.9</li>
                                        <li><strong>UI Lib:</strong> React 19 RC</li>
                                        <li><strong>Styles:</strong> Tailwind (Planned) / CSS Modules</li>
                                        <li><strong>Data Viz:</strong> Apache ECharts 5.x</li>
                                        <li><strong>Forms:</strong> React Hook Form</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', borderBottom: '1px solid var(--primary)' }}>Backend</h4>
                                    <ul className="feature-list" style={{ fontSize: '0.9rem' }}>
                                        <li><strong>Runtime:</strong> Node.js v20 LTS</li>
                                        <li><strong>Framework:</strong> Express 4.x</li>
                                        <li><strong>Auth:</strong> JWT + Bcrypt</li>
                                        <li><strong>Logs:</strong> Winston + Morgan</li>
                                        <li><strong>Process:</strong> PM2 Cluster Mode</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', borderBottom: '1px solid var(--primary)' }}>Data & Ops</h4>
                                    <ul className="feature-list" style={{ fontSize: '0.9rem' }}>
                                        <li><strong>DB:</strong> PostgreSQL 16</li>
                                        <li><strong>ORM:</strong> Prisma 6.x</li>
                                        <li><strong>CI/CD:</strong> GitHub Actions (Planned)</li>
                                        <li><strong>Host:</strong> Windows Server / Linux</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

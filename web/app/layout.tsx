import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diego Rojas | Tech Lead & Full Stack Engineer',
  description: 'Portafolio y CV de Diego Rojas - Tech Lead & Full Stack Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}

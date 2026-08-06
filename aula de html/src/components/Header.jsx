import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Brand from './Brand.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/noticias', label: 'Notícias' },
  { to: '/tecnologia', label: 'Tecnologia' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-bold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-yellow-400 ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 shadow-xl backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={navClass}>{label}</NavLink>)}
        </nav>
        <div className="hidden md:block">
          <Link to="/login" state={{ from: location.pathname }} className="inline-flex rounded-xl bg-gradient-to-r from-yellow-400 to-amber-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-yellow-400/10 outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-yellow-400/20 focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">Perfil</Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white outline-none transition duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-yellow-400 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="relative h-5 w-6" aria-hidden="true">
            <span className={`absolute left-0 top-0.5 h-0.5 w-6 bg-current transition duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-2.5 h-0.5 w-6 bg-current transition duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-[18px] h-0.5 w-6 bg-current transition duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
      <nav id="mobile-menu" className={`${isOpen ? 'grid' : 'hidden'} gap-2 border-t border-white/10 px-4 py-4 md:hidden`} aria-label="Navegação mobile">
        {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} onClick={() => setIsOpen(false)} className={navClass}>{label}</NavLink>)}
        <Link to="/login" onClick={() => setIsOpen(false)} className="mt-1 rounded-xl bg-yellow-400 px-4 py-3 text-center font-black text-slate-950 outline-none transition duration-300 hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-white">Perfil</Link>
      </nav>
    </header>
  )
}

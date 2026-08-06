import { Link } from 'react-router-dom'
import { images } from '../data/content.js'

export default function Brand({ dark = false }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 rounded-xl font-black tracking-tight outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-4 ${dark ? 'text-slate-900 focus-visible:ring-offset-white' : 'text-white focus-visible:ring-offset-slate-950'}`}
      aria-label="Central J1 — página inicial"
    >
      <img className="h-11 w-11 rounded-xl border-2 border-white/20 object-cover shadow-lg" src={images.logo} alt="" />
      <span className="text-xl sm:text-2xl">Central J1</span>
    </Link>
  )
}

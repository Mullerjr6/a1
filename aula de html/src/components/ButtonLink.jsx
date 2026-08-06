import { Link } from 'react-router-dom'

export default function ButtonLink({ to, children, variant = 'primary' }) {
  const styles = variant === 'primary'
    ? 'bg-gradient-to-r from-yellow-400 to-amber-300 text-slate-950 shadow-lg shadow-yellow-400/15 hover:-translate-y-0.5'
    : 'border border-white/25 bg-white/10 text-white hover:bg-white/20'
  return <Link to={to} className={`inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 font-extrabold outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${styles}`}>{children}</Link>
}

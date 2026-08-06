import { Link } from 'react-router-dom'

export default function ContentCard({ image, alt, tag, title, text, to, link = 'Continuar lendo' }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="h-52 overflow-hidden"><img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src={image} alt={alt} loading="lazy" /></div>
      <div className="p-6"><span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">{tag}</span><h3 className="mt-4 text-xl font-extrabold leading-snug text-slate-950">{title}</h3><p className="mt-3 leading-relaxed text-slate-600">{text}</p>{to && <Link to={to} className="mt-5 inline-flex rounded font-extrabold text-blue-700 outline-none transition duration-300 hover:text-blue-900 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600">{link} <span aria-hidden="true">→</span></Link>}</div>
    </article>
  )
}

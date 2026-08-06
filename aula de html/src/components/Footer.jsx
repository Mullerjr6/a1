import { Link } from 'react-router-dom'
import Brand from './Brand.jsx'

export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div><Brand /><p className="mt-4 max-w-md leading-relaxed text-slate-300">Portal moderno com foco em notícias, tecnologia e esportes, com visual mais elegante e organizado.</p></div>
          <div><h2 className="font-bold">Navegação</h2><ul className="mt-4 grid gap-2 text-slate-300"><li><Link className="rounded outline-none transition duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-yellow-400" to="/">Home</Link></li><li><Link className="rounded outline-none transition duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-yellow-400" to="/noticias">Notícias</Link></li><li><Link className="rounded outline-none transition duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-yellow-400" to="/tecnologia">Tecnologia</Link></li></ul></div>
          <div><h2 className="font-bold">Contato</h2><a className="mt-4 inline-flex rounded-xl bg-gradient-to-r from-yellow-400 to-amber-300 px-5 py-3 font-black text-slate-950 outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white" href="mailto:seuemail@email.com?subject=Contato%20com%20a%20Central%20J1&amp;body=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Central%20J1.">Fale Conosco</a></div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">Junior Maia - 2026</p>
      </div>
    </footer>
  )
}

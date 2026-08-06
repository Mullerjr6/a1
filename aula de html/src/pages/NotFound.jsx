import { Link } from 'react-router-dom'
import DocumentTitle from '../components/DocumentTitle.jsx'

export default function NotFound() {
  return <section className="flex min-h-[65vh] items-center justify-center px-4 py-20 text-center"><DocumentTitle title="Página não encontrada | Central J1" /><div><p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">Erro 404</p><h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-6xl">Página não encontrada</h1><p className="mx-auto mt-4 max-w-lg text-lg text-slate-600">O endereço informado não existe ou foi movido.</p><Link to="/" className="mt-8 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-extrabold text-white shadow-lg outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:ring-4 focus-visible:ring-blue-300">Voltar para a página inicial</Link></div></section>
}

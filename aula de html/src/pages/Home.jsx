import { Link } from 'react-router-dom'
import ButtonLink from '../components/ButtonLink.jsx'
import ContentCard from '../components/ContentCard.jsx'
import DocumentTitle from '../components/DocumentTitle.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { homeHighlights, images } from '../data/content.js'

const compactNews = [
  { image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=600&q=80', alt: 'Jornais representando informação e tecnologia', title: 'Tecnologia continua moldando o futuro da informação', text: 'IA, inovação digital e conectividade mudam a forma como consumimos conteúdo.' },
  { image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=600&q=80', alt: 'Atleta correndo em uma pista', title: 'Grandes eventos esportivos seguem dominando o interesse do público', text: 'Competições, torcidas e atletas em alta movimentam o cenário esportivo.' },
  { image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80', alt: 'Cidade moderna vista entre prédios', title: 'Atualidades exigem leitura rápida, clara e visualmente organizada', text: 'Um bom portal facilita a navegação e valoriza cada conteúdo publicado.' },
]

const categories = [
  { title: 'Notícias', text: 'Atualidades, manchetes e assuntos do momento.', image: images.newsHero, to: '/noticias' },
  { title: 'Esportes', text: 'Campeonatos, atletas e destaques esportivos.', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80' },
  { title: 'Tecnologia', text: 'Inovação, inteligência artificial e mundo digital.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', to: '/tecnologia' },
  { title: 'Acesso', text: 'Entre no portal com uma interface visual moderna.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', to: '/login' },
]

function Category({ item }) {
  const content = <><img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" /><span className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" /><span className="relative mt-auto"><strong className="block text-xl font-black">{item.title}</strong><span className="mt-1 block text-sm leading-relaxed text-blue-100">{item.text}</span></span></>
  const classes = 'group relative flex min-h-52 overflow-hidden rounded-3xl p-6 text-white shadow-xl outline-none transition duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-blue-500'
  return item.to ? <Link to={item.to} className={classes}>{content}</Link> : <article className={classes}>{content}</article>
}

export default function Home() {
  return (
    <>
      <DocumentTitle title="Central J1 | Portal de Notícias" />
      <PageHero image={images.homeHero} badge="• Informação em destaque" title="O seu portal completo de notícias, esportes e tecnologia" description="Acompanhe os principais destaques do momento com uma experiência visual mais moderna, profissional e organizada, em um portal pensado para impressionar." primary={{ to: '#destaques', label: 'Explorar portal' }} secondary={{ to: '#categorias', label: 'Ver editorias' }} stats={[{ value: '+120', label: 'Manchetes em destaque' }, { value: '24h', label: 'Conteúdo sempre atualizado' }, { value: '3 áreas', label: 'Notícias, Esportes e Tech' }]} />

      <section className="border-y border-blue-100 bg-blue-50 py-5" aria-label="Características do portal"><div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">{[['Portal profissional', 'Layout limpo e moderno'], ['Visual atraente', 'Imagens e cards elegantes'], ['Responsivo', 'Funciona bem no celular'], ['Fácil de editar', 'Estrutura pronta para personalizar']].map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm"><strong className="block text-lg text-slate-950">{title}</strong><span className="text-sm text-slate-600">{text}</span></div>)}</div></section>

      <section id="destaques" className="scroll-mt-24 py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Destaques" title="As principais manchetes do dia" description="Uma seleção de conteúdos em evidência para deixar a sua home com cara de portal real." /><div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"><div className="h-72 overflow-hidden sm:h-96"><img src={images.newsHero} alt="Jornais representando a notícia principal" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /></div><div className="p-6 sm:p-8"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">Destaque principal</span><h3 className="mt-4 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">Informação de qualidade e apresentação profissional fazem toda a diferença em um portal moderno</h3><p className="mt-4 leading-relaxed text-slate-600">Um site bem estruturado, com imagens fortes, navegação simples e seções bem organizadas, transmite mais credibilidade e chama mais atenção logo no primeiro acesso.</p><Link to="/noticias" className="mt-5 inline-flex rounded font-extrabold text-blue-700 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-600">Ir para notícias →</Link></div></article>
        <div className="grid gap-4">{compactNews.map((item) => <article key={item.title} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition duration-300 hover:-translate-y-1 min-[420px]:flex-row"><img src={item.image} alt={item.alt} className="h-40 w-full rounded-xl object-cover min-[420px]:h-24 min-[420px]:w-28" loading="lazy" /><div><h3 className="font-extrabold leading-snug text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p></div></article>)}</div>
      </div></div></section>

      <section id="categorias" className="scroll-mt-24 bg-white py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Editorias" title="Explore por categoria" description="Blocos visuais para destacar as principais áreas do seu portal." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{categories.map((item) => <Category key={item.title} item={item} />)}</div></div></section>

      <section className="py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Mais lidas" title="Conteúdos em destaque" /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{homeHighlights.map((card) => <ContentCard key={card.title} {...card} />)}</div></div></section>

      <section className="pb-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="relative isolate overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-2xl sm:p-12"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 to-blue-800/80" /><h2 className="text-3xl font-black">Um portal com cara profissional de verdade</h2><p className="mt-3 max-w-2xl text-blue-100">Essa estrutura já está pronta para você apresentar, editar e evoluir. Basta trocar textos, imagens, logo e links para deixar com a sua identidade.</p><div className="mt-6"><ButtonLink to="/login">Entrar no portal</ButtonLink></div></div></div></section>
    </>
  )
}

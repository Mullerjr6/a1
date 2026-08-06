import ContentCard from '../components/ContentCard.jsx'
import DocumentTitle from '../components/DocumentTitle.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { images, newsCards } from '../data/content.js'

export default function Noticias() {
  return <><DocumentTitle title="Central J1 | Notícias" /><PageHero image={images.newsHero} badge="Atualidades • Manchetes • Informação" title="As principais notícias em uma página elegante e impactante" description="Atualidades, temas em alta e conteúdos relevantes organizados em uma experiência visual mais profissional." primary={{ to: '#principais', label: 'Ver principais' }} secondary={{ to: '/', label: 'Voltar para home' }} /><section id="principais" className="scroll-mt-24 py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Notícias" title="Principais destaques" /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{newsCards.map((card) => <ContentCard key={card.title} {...card} />)}</div></div></section></>
}

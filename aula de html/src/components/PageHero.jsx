import ButtonLink from './ButtonLink.jsx'

export default function PageHero({ image, badge, title, description, primary, secondary, stats = [] }) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-blue-900/50" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl"><span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">{badge}</span><h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">{description}</p><div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row"><ButtonLink to={primary.to}>{primary.label}</ButtonLink><ButtonLink to={secondary.to} variant="secondary">{secondary.label}</ButtonLink></div>
        {stats.length > 0 && <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">{stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"><strong className="block text-lg">{stat.value}</strong><span className="text-sm text-blue-100">{stat.label}</span></div>)}</div>}</div>
      </div>
    </section>
  )
}

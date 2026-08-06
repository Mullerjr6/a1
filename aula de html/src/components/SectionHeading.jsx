export default function SectionHeading({ eyebrow, title, description }) {
  return <div className="mx-auto mb-9 max-w-3xl text-center"><p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">{eyebrow}</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>{description && <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}</div>
}

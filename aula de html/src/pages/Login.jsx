import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import DocumentTitle from '../components/DocumentTitle.jsx'
import { images } from '../data/content.js'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const location = useLocation()
  const backTo = location.state?.from || '/'

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) { setMessage('Preencha corretamente o e-mail e a senha.'); form.reportValidity(); return }
    setMessage('Demonstração concluída. Este projeto não possui autenticação real.')
  }

  return <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white"><DocumentTitle title="Login - Central J1" /><img src={images.login} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/90 to-blue-800/75" /><section className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-9" aria-labelledby="login-title"><div className="text-center"><Brand /><h1 id="login-title" className="mt-7 text-3xl font-black">Entre na sua conta</h1><p className="mt-2 text-blue-100">Acesse a experiência da Central J1</p></div><form className="mt-8" onSubmit={handleSubmit} noValidate><label htmlFor="email" className="mb-2 block font-bold">E-mail</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="Digite seu e-mail" className="mb-5 w-full rounded-xl border border-transparent bg-white px-4 py-3.5 text-base text-slate-950 outline-none transition duration-300 placeholder:text-slate-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/25" /><label htmlFor="senha" className="mb-2 block font-bold">Senha</label><div className="relative"><input id="senha" name="senha" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required minLength="4" placeholder="Digite sua senha" className="w-full rounded-xl border border-transparent bg-white py-3.5 pl-4 pr-20 text-base text-slate-950 outline-none transition duration-300 placeholder:text-slate-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/25" /><button type="button" onClick={() => setShowPassword((show) => !show)} className="absolute inset-y-1 right-1 rounded-lg px-3 text-sm font-bold text-blue-700 outline-none transition duration-300 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>{showPassword ? 'Ocultar' : 'Mostrar'}</button></div><button type="submit" className="mt-6 w-full rounded-xl bg-gradient-to-r from-yellow-400 to-amber-300 px-5 py-3.5 font-black text-slate-950 shadow-lg outline-none transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800">Entrar</button>{message && <p role="status" className="mt-4 rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm text-blue-50">{message}</p>}</form><div className="mt-6 text-center"><Link to={backTo} className="rounded font-bold text-white outline-none transition duration-300 hover:text-yellow-300 hover:underline focus-visible:ring-2 focus-visible:ring-yellow-400">← Voltar para Home</Link></div></section></main>
}

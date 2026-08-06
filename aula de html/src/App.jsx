import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Noticias from './pages/Noticias.jsx'
import Tecnologia from './pages/Tecnologia.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="tecnologia" element={<Tecnologia />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

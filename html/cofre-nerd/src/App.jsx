import Cart from './components/Cart'
import Header from './components/Header'
import ProductList from './components/ProductList'

function App() {
  return (
    <>
      <Header />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <ProductList />
        <Cart />
      </main>

      <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        Cofre Nerd - Loja de cartas Pokémon
      </footer>
    </>
  )
}

export default App

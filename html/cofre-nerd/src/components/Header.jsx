import { useSelector } from 'react-redux'

function formatPrice(price) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function Header() {
  const quantidade = useSelector((state) => state.cart.totalQuantity)
  const valorTotal = useSelector((state) => state.cart.totalValue)

  return (
    <header className="border-b border-red-700 bg-zinc-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-red-600"
            aria-hidden="true"
          >
            <svg viewBox="0 0 48 48" className="h-10 w-10">
              <path d="M4 24a20 20 0 0 1 40 0H4Z" fill="#dc2626" />
              <path d="M4 24a20 20 0 0 0 40 0H4Z" fill="#ffffff" />
              <path d="M4 24h40" stroke="#18181b" strokeWidth="5" />
              <circle cx="24" cy="24" r="7" fill="#ffffff" stroke="#18181b" strokeWidth="4" />
              <circle cx="24" cy="24" r="3" fill="#d4d4d8" />
            </svg>
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">Cofre Nerd</h1>
            <p className="text-sm text-zinc-400">Seu cofre de cartas Pokémon</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-white">
            🛒 {quantidade} {quantidade === 1 ? 'item' : 'itens'}
          </p>
          <p className="text-sm font-bold text-yellow-400">
            {formatPrice(valorTotal)}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header

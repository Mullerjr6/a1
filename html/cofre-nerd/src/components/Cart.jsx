import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'

function formatPrice(price) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function Cart() {
  const items = useSelector((state) => state.cart.items)
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const totalValue = useSelector((state) => state.cart.totalValue)
  const dispatch = useDispatch()

  return (
    <aside className="rounded-lg border border-zinc-700 bg-zinc-900 p-5 lg:sticky lg:top-4">
      <h2 className="mb-5 text-2xl font-bold">Carrinho</h2>

      {items.length === 0 ? (
        <p className="rounded border border-dashed border-zinc-600 p-6 text-center text-sm text-zinc-400">
          Seu Cofre Nerd está vazio.
        </p>
      ) : (
        <>
          <ul className="max-h-96 overflow-y-auto">
            {items.map((item) => (
              <li className="flex items-center gap-3 border-b border-zinc-700 py-3" key={item.id}>
                {item.image && (
                  <img
                    className="h-14 w-10 rounded object-cover"
                    src={item.image}
                    alt={`Miniatura de ${item.name}`}
                  />
                )}

                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-sm">{item.name}</strong>
                  <span className="text-xs text-zinc-400">Quantidade: {item.quantity}</span>
                </div>

                <span className="text-xs font-bold text-yellow-400">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-zinc-400">Quantidade total</span>
              <strong>{totalQuantity}</strong>
            </p>
            <p className="flex justify-between border-t border-zinc-700 pt-3">
              <span>Valor total</span>
              <strong className="text-yellow-400">{formatPrice(totalValue)}</strong>
            </p>
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded bg-red-600 p-3 text-sm font-semibold text-white hover:bg-red-700"
            onClick={() => dispatch(clearCart())}
          >
            Limpar Carrinho
          </button>
        </>
      )}
    </aside>
  )
}

export default Cart

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'

const DOLLAR_TO_REAL = 5

function formatPrice(price) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function getCardPrice(card) {
  const prices = card.tcgplayer?.prices
  const priceTypes = Object.values(prices ?? {})

  const marketPrice = priceTypes.find((price) => price?.market)?.market
  const midPrice = priceTypes.find((price) => price?.mid)?.mid

  // A API usa dólar. Para a atividade, foi usada uma conversão fixa para reais.
  const priceInDollar = marketPrice ?? midPrice ?? 4.99
  return Number((priceInDollar * DOLLAR_TO_REAL).toFixed(2))
}

function ProductList() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    async function loadCards() {
      try {
        const response = await axios.get(
          'https://api.pokemontcg.io/v2/cards?page=1&pageSize=20',
        )

        setCards(response.data.data)
        setError('')
      } catch (erro) {
        console.error('Erro ao carregar as cartas Pokémon:', erro)
        setError(
          'Não foi possível carregar as cartas Pokémon. Tente novamente mais tarde.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadCards()
  }, [])

  function handleBuy(card) {
    const produto = {
      id: card.id,
      name: card.name,
      image: card.images?.small ?? '',
      price: getCardPrice(card),
    }

    dispatch(addItem(produto))
  }

  if (loading) {
    return (
      <section>
        <h2 className="mb-5 text-2xl font-bold">Cartas disponíveis</h2>
        <p className="rounded-lg bg-zinc-900 p-8 text-center text-zinc-300">
          Carregando cartas Pokémon...
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2 className="mb-5 text-2xl font-bold">Cartas disponíveis</h2>
        <p className="rounded-lg border border-red-600 bg-zinc-900 p-8 text-center text-red-500">
          {error}
        </p>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cartas disponíveis</h2>
        <span className="text-sm text-zinc-400">{cards.length} cartas</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const price = getCardPrice(card)

          return (
            <article
              className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900"
              key={card.id}
            >
              <div className="card-image-area relative flex h-72 items-center justify-center p-4">
                {card.images?.small ? (
                  <img
                    className="h-64 object-contain"
                    src={card.images.small}
                    alt={`Carta ${card.name}`}
                  />
                ) : (
                  <p className="text-sm text-zinc-400">Imagem indisponível</p>
                )}

                <span className="absolute top-3 right-3 rounded bg-zinc-950 px-2 py-1 text-xs text-yellow-400">
                  {card.rarity ?? 'Raridade comum'}
                </span>
              </div>

              <div className="p-4">
                <p className="text-xs text-zinc-400">
                  {card.set?.name ?? 'Coleção desconhecida'}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">{card.name}</h3>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <strong className="text-yellow-400">{formatPrice(price)}</strong>
                  <button
                    type="button"
                    className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    onClick={() => handleBuy(card)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ProductList

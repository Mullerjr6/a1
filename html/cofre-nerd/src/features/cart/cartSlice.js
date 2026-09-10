import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalValue: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }

      state.totalQuantity += 1
      state.totalValue = Number((state.totalValue + product.price).toFixed(2))
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalValue = 0
    },
  },
})

export const { addItem, clearCart } = cartSlice.actions

export default cartSlice.reducer

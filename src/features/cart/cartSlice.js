import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: 'Mediterrenean',
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //mine logic
      state.cart = state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity++;
          item.totalPrice = item.quantity * item.unitPrice;
        }
        return item;
      });
    },
    decreaseItemQuantity(state, action) {
      //tutor logic
      const foundItem = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      foundItem.quantity--;
      foundItem.totalPrice = foundItem.quantity * foundItem.unitPrice;

      if (foundItem.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
        // cartSlice.actions.deleteItem(action.payload);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) => {
  return state.cart.cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
};
export const getTotalCartPrice = (state) => {
  return state.cart.cart.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);
};

export const getCurrentQunatityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

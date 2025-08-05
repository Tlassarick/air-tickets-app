import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/CartSlice';
// Створюємо Redux store з одним редьюсером — корзиною
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
// Підписуємося на всі зміни у store — при кожній зміні стану корзини
// зберігаємо її в localStorage для збереження стану між оновленнями сторінки
store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
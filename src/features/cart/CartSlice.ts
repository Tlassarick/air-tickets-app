import { createSlice} from '@reduxjs/toolkit';
import  type {PayloadAction}  from '@reduxjs/toolkit';
import type { CartItem } from '../../types/flight';
// Тип стану корзини — масив об'єктів CartItem
type CartState = {
  items: CartItem[];
};
// Ініціалізація корзини з localStorage (якщо є дані)
function getInitialCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem('cart') || '[]');
    // Перевіряємо, чи це масив, якщо ні — повертаємо порожній масив
    return Array.isArray(parsed) ? parsed : [];
  } catch {
     // Якщо помилка парсингу — повертаємо порожній масив
    return [];
  }
}
// Початковий стан корзини
const initialState: CartState = {
  items: getInitialCart(),
};
// Створення slice для корзини
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      // Додає елемент у корзину
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
      // Видаляє конкретний елемент з корзини по flightId та seatNumber
    removeFromCart: (state, action: PayloadAction<{ flightId: string; seatNumber: string }>) => {
      state.items = state.items.filter(
        (item) =>
          !(item.flightId === action.payload.flightId && item.seatNumber === action.payload.seatNumber)
      );
    },
       // Очищає всю корзину
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
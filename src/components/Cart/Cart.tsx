import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { removeFromCart, clearCart } from '../../features/cart/CartSlice';
import { Card, CardContent, Typography, IconButton, Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart: React.FC = () => {
  // Отримуємо масив товарів у корзині із глобального стану Redux
  const items = useSelector((state: RootState) => state.cart.items);
  // Дістаємо функцію dispatch для відправки екшенів у Redux
  const dispatch = useDispatch();
// Перевірка: якщо items не є масивом (можлива помилка стану), показати повідомлення
if (!Array.isArray(items)) {
  return <Typography color="error">Корзина пошкоджена! Очистіть сторінку</Typography>;
}
 // Підрахунок загальної суми у корзині
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <Typography variant="h5">Корзина</Typography>
      {items.length === 0 && <Typography>Корзина порожня</Typography>}
        {/* Відображаємо список товарів у корзині */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        {items.map(item => (
          <Card key={item.flightId + item.seatNumber}>
            <CardContent>
              <Typography>Рейс: {item.flight.airline} ({item.flight.from} → {item.flight.to})</Typography>
              <Typography>Місце: {item.seatNumber}</Typography>
              <Typography>Ціна: {item.price}₴</Typography>
               {/* Кнопка видалення одного елементу з корзини */}
              <IconButton onClick={() => dispatch(removeFromCart({ flightId: item.flightId, seatNumber: item.seatNumber }))}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Stack>
      {/* Якщо корзина не порожня – показати загальну суму і кнопку очистки */}
      {items.length > 0 && (
        <div>
          <Typography sx={{ mt: 2 }}>Загальна сума: <b>{total}₴</b></Typography>
          {/* Кнопка повного очищення корзини */}
          <Button color="error" onClick={() => dispatch(clearCart())}>Очистити корзину</Button>
        </div>
      )}
      
    </div>
  );
};

export default Cart;
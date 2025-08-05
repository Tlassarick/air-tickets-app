import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFlightById } from '../../api/flightsApi';
import type { Flight, Seat } from '../../types/flight';
import { CircularProgress, Typography, Grid, Button } from '@mui/material';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/CartSlice';
import { generateSeats } from '../../utils/seatGenerator';

const FlightDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const dispatch = useDispatch();

  // Завантажуємо інформацію про рейс і генеруємо місця при монтуванні/зміні id
  useEffect(() => {
    setLoading(true);
    if (!id) return;
    fetchFlightById(id)
      .then(res => {
        setFlight(res.data);
        // Генеруємо місця (наприклад, 10 рядів по 6 місць, 15 зайнятих)
        setSeats(generateSeats(10, 6, 15));
      })
      .catch(() => setError('Не вдалося завантажити рейс'))
      .finally(() => setLoading(false));
  }, [id]);
/**
   * Обробка вибору місця користувачем.
   * Якщо місце не зайняте, додаємо його до корзини та позначаємо як вибране.
   */
  function handleSelect(seat: Seat) {
    if (seat.occupied) return;// Якщо місце зайняте — ігноруємо
    setSelected(seat.seatNumber);
    if (flight) {
      // Додаємо до корзини
      dispatch(addToCart({ flightId: flight.id, seatNumber: seat.seatNumber, price: flight.price, flight }));
    }
  }
  // Відображення індикатора завантаження
  if (loading) return <CircularProgress />;
   // Відображення помилки, якщо є
  if (error) return <Typography color="error">{error}</Typography>;
   // Якщо рейс не знайдений — нічого не рендеримо
  if (!flight) return null;

  return (
    <div>
      {/* Інформація про рейс */}
      <Typography variant="h5">{flight.airline} | {flight.from} → {flight.to}</Typography>
      <Typography>Термінал: {flight.terminal} | Ворота: {flight.gate}</Typography>
      <Typography>Відправлення: {flight.departureTime} | Прибуття: {flight.arrivalTime}</Typography>
      <Typography sx={{ my: 2 }}>Виберіть місце:</Typography>
       {/* Сітка місць */}
      <Grid container spacing={1}>
        {seats.map((seat) => (
          <Grid item xs={1} key={seat.seatNumber}>
            <Button
              onClick={() => handleSelect(seat)}
              variant={seat.occupied ? "outlined" : selected === seat.seatNumber ? "contained" : "outlined"}
              color={seat.occupied ? "error" : selected === seat.seatNumber ? "success" : "primary"}
              startIcon={seat.occupied ? <AirlineSeatIndividualSuiteIcon /> : <AirlineSeatReclineNormalIcon />}
              disabled={seat.occupied}
              sx={{ minWidth: 40, minHeight: 40, m: 0.2 }}
            >
              {seat.seatNumber}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FlightDetailsPage;
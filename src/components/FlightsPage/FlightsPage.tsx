import React, { useEffect, useState } from 'react';
import { fetchFlights } from '../../api/flightsApi';
import type { Flight } from '../../types/flight';
import { CircularProgress,  Card, CardContent, Typography, Button, IconButton, Stack } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

/**
 * Головна сторінка – список усіх рейсів у вигляді карток
 */

const FlightsPage: React.FC = () => {
  // Стан для рейсів, завантаження, помилок і сортування
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sort, setSort] = useState<'price' | 'departureTime'>('price');
  const navigate = useNavigate();

  // Завантаження рейсів з API при монтуванні компонента
  useEffect(() => {
    setLoading(true);
    fetchFlights()
      .then(res => setFlights(res.data))
      .catch(() => setError('Не вдалося завантажити рейси'))
      .finally(() => setLoading(false));
  }, []);
// Сортування рейсів по ціні або часу відправлення
  const sortedFlights = [...flights].sort((a, b) =>
    sort === 'price'
      ? a.price - b.price
      : a.departureTime.localeCompare(b.departureTime)
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
        {/* Кнопки для вибору способу сортування */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant={sort === 'price' ? "contained" : "outlined"} onClick={() => setSort('price')}>Сортувати за ціною</Button>
        <Button variant={sort === 'departureTime' ? "contained" : "outlined"} onClick={() => setSort('departureTime')}>Сортувати за часом</Button>
      </Stack>
      {/* Відображення карток рейсів у сітці */}
      <Grid container spacing={2}>
        {sortedFlights.map(flight => (
          <Grid item xs={12} sm={6} md={4} key={flight.id}>
             {/* Картка одного рейсу, при кліку – перехід на сторінку деталей */}
            <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/flights/${flight.id}`)}>
              <CardContent>
                <Typography variant="h6">{flight.airline}</Typography>
                <Typography>{flight.from} → {flight.to}</Typography>
                <Typography>Відправлення: {flight.departureTime}</Typography>
                <Typography>Прибуття: {flight.arrivalTime}</Typography>
                <Typography>Термінал: {flight.terminal}, Ворота: {flight.gate}</Typography>
                <Typography>Квитки: {flight.tickets.remaining}/{flight.tickets.total}</Typography>
                <Typography>Ціна: {flight.price}₴</Typography>
                <IconButton>
                  <StarBorderIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FlightsPage;
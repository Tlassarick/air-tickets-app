import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlightsPage from '../components/FlightsPage/FlightsPage';
import FlightDetailsPage from '../components/FlightDetails/FlightDetails';
import Cart from '../components/Cart/Cart';

/**
 * Головний роутер додатка – організація переходів між сторінками
 */
const AppRouter: React.FC = () => (
  <Routes>
        {/* Головна сторінка – список рейсів */}
    <Route path="/" element={<FlightsPage />} />
     {/* Сторінка деталей рейсу */}
    <Route path="/flights/:id" element={<FlightDetailsPage />} />
     {/* Сторінка деталей рейсу */}
    <Route path="/cart" element={<Cart />} />
  </Routes>
);

export default AppRouter;
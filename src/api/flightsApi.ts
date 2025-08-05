import axios from 'axios';
import type{ Flight } from '../types/flight';

const BASE = 'https://679d13f487618946e6544ccc.mockapi.io/testove/v1';

export const fetchFlights = () => axios.get<Flight[]>(`${BASE}/flights`);
export const fetchFlightById = (id: string) => axios.get<Flight>(`${BASE}/flights/${id}`);
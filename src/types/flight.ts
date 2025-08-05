export type Flight = {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  terminal: string;
  gate: string;
  tickets:{
        total:number;
        remaining:number;
    };
};

export type Seat = {
  row: number;
  col: number;
  seatNumber: string;
  occupied: boolean;
};

export type CartItem = {
  flightId: string;
  flight: Flight;
  seatNumber: string;
  price: number;
};

import type { Seat } from '../types/flight';
/**
 * Генерує масив місць у літаку із випадково зайнятими місцями.
 * @param rows - кількість рядів
 * @param cols - кількість місць у ряду
 * @param occupiedCount - кількість зайнятих місць (за замовчуванням 12)
 * @returns Масив об'єктів Seat
 */
export function generateSeats(rows: number, cols: number, occupiedCount: number = 12): Seat[] {
  const seats: Seat[] = [];
  const occupiedSet = new Set<number>();
  // Випадковим чином генеруємо унікальні номери зайнятих місць
  while (occupiedSet.size < occupiedCount) {
    occupiedSet.add(Math.floor(Math.random() * rows * cols));
  }
   // Для кожного місця у літаку створюємо об'єкт Seat
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      seats.push({
        row,
        col,
        seatNumber: `${String.fromCharCode(65 + row)}${col + 1}`,
        occupied: occupiedSet.has(idx),// true, якщо місце зайняте
      });
    }
  }
  return seats;
}
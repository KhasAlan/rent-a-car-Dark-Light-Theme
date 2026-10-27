import { Car } from "@/types/car.type";

export function getCarSpecs(car: Car) {
  return {
    rating: car.rating ?? 4.8,
    topSpeed: car.topSpeed ?? 250,
    seats: car.seats,
    doors: car.doors ?? (/coupe|convertible|roadster/i.test(car.type) ? 2 : 4),
    wifi: car.wifi ?? true,
    sensor: car.sensor ?? true,
    bluetooth: car.bluetooth ?? "5.0",
  };
}

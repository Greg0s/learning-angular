import { FuelType, Driver } from './';

export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  capacity: number;
  isActive: boolean;
  driver?: Driver;
  maintenanceDate?: Date;
}

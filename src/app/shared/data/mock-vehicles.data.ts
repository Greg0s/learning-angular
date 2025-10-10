import { Vehicle, Driver, FuelType } from '@shared/models';

// Mock data for vehicles and drivers

const drivers: Driver[] = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    licenseNumber: '123456789012',
  },
  {
    id: 2,
    firstName: 'Sophie',
    lastName: 'Martin',
    licenseNumber: '987654321098',
  },
  {
    id: 3,
    firstName: 'Marc',
    lastName: 'Lefevre',
    licenseNumber: '112233445566',
  },
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    licensePlate: 'AB-123-CD',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    fuelType: FuelType.ELECTRIC,
    capacity: 5,
    isActive: true,
    driver: drivers.find((d) => d.id === 1),
    maintenanceDate: new Date('2026-01-15'),
  },
  {
    id: 2,
    licensePlate: 'EF-456-GH',
    brand: 'Renault',
    model: 'Kangoo',
    year: 2020,
    fuelType: FuelType.DIESEL,
    capacity: 2,
    isActive: true,
    driver: drivers.find((d) => d.id === 1),
    maintenanceDate: undefined,
  },
  {
    id: 3,
    licensePlate: 'IJ-789-KL',
    brand: 'Ford',
    model: 'F-150',
    year: 2019,
    fuelType: FuelType.GASOLINE,
    capacity: 5,
    isActive: false,
    driver: drivers.find((d) => d.id === 2),
    maintenanceDate: new Date('2025-11-05'),
  },
  {
    id: 4,
    licensePlate: 'MN-012-OP',
    brand: 'Toyota',
    model: 'Prius',
    year: 2023,
    fuelType: FuelType.HYBRID,
    capacity: 5,
    isActive: true,
    driver: undefined,
    maintenanceDate: new Date('2025-10-25'),
  },
  {
    id: 5,
    licensePlate: 'QR-345-ST',
    brand: 'Mercedes',
    model: 'Actros',
    year: 2018,
    fuelType: FuelType.DIESEL,
    capacity: 2,
    isActive: true,
    driver: drivers.find((d) => d.id === 3),
    maintenanceDate: undefined,
  },
];

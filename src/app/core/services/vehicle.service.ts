import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, map, Observable, of } from 'rxjs';
import { Vehicle } from '@shared/models/vehicle.model';
import { MOCK_VEHICLES } from '@shared/data/mock-vehicles.data';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  // Private subjects
  private vehiclesSubject = new BehaviorSubject<Vehicle[]>([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  // Public observables
  vehicles$ = this.vehiclesSubject.asObservable();
  searchTerm$ = this.searchTermSubject.asObservable();

  // Filter
  filteredVehicles$ = combineLatest([this.vehicles$, this.searchTerm$]).pipe(
    map(([vehicles, search]) => {
      const lowerSearch = search.toLowerCase();

      return vehicles.filter(
        (v) =>
          // Vehicle fields
          v.licensePlate.toLowerCase().includes(lowerSearch) ||
          v.brand.toLowerCase().includes(lowerSearch) ||
          v.model.toLowerCase().includes(lowerSearch) ||
          v.year.toString().includes(lowerSearch) ||
          v.fuelType.toLowerCase().includes(lowerSearch) ||
          v.capacity.toString().includes(lowerSearch) ||
          (v.maintenanceDate ? v.maintenanceDate.toString() : '').includes(lowerSearch) ||
          // Driver fields
          (v.driver && v.driver.firstName.toLowerCase().includes(lowerSearch)) ||
          (v.driver && v.driver.lastName.toLowerCase().includes(lowerSearch)) ||
          (v.driver && v.driver.licenseNumber.includes(lowerSearch))
      );
    })
  );

  constructor() {
    this.loadVehicles();
  }

  private loadVehicles() {
    of(MOCK_VEHICLES)
      .pipe(delay(300))
      .subscribe((data) => {
        this.vehiclesSubject.next(data);
      });
  }

  // Update search term
  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  // Add vehicle
  create(vehicle: Vehicle): Observable<Vehicle> {
    const updated = [...this.vehiclesSubject.value, vehicle];
    this.vehiclesSubject.next(updated);
    return of(vehicle).pipe(delay(300));
  }

  // Delete vehicle
  delete(id: number): Observable<void> {
    const updated = this.vehiclesSubject.value.filter((v) => v.id !== id);
    this.vehiclesSubject.next(updated);
    return of(void 0).pipe(delay(300));
  }

  update(vehicle: Vehicle): Observable<Vehicle> {
    const currentVehicles = this.vehiclesSubject.value;

    // Find index of the vehicle to update
    const index = currentVehicles.findIndex((v) => v.id === vehicle.id);

    if (index > -1) {
      const updatedVehicles = [...currentVehicles];
      updatedVehicles[index] = vehicle;

      this.vehiclesSubject.next(updatedVehicles);

      // Simulate backend delay
      return of(vehicle).pipe(delay(300));
    }

    console.error(`Véhicule avec ID ${vehicle.id} non trouvé pour la mise à jour.`);
    return of(vehicle);
  }
}

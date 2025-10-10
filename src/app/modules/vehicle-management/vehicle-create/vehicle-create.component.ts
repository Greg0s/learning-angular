import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuelTypeControlComponent } from '@shared/components/fuel-type-control/fuel-type-control.component';
import { DriverFormComponent } from '@shared/components/driver-form/driver-form.component';
import { VehicleService } from '@core/services/vehicle.service';
import { Vehicle } from '@shared/models/vehicle.model';
import { take } from 'rxjs';
import { TEXT_CONTENT } from '@shared/data/content.data';

@Component({
  selector: 'app-vehicle-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    FuelTypeControlComponent,
    DriverFormComponent,
    MatSlideToggleModule,
  ],
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCreateComponent {
  readonly REQUIRED_ERROR_MSG = TEXT_CONTENT.error.required; // get required error message
  vehicleForm: FormGroup;
  hasDriver = false; // Toggle state to show/hide driver form
  hasDriverControl = new FormControl(false);

  // Define reactive form with validation for vehicle
  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/i)]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [
        null,
        [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)],
      ],
      fuelType: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      isActive: [true],
      maintenanceDate: [null],
      driver: [null],
    });
  }

  get f() {
    return this.vehicleForm.controls;
  }

  // Handle toggle to display or not driver form
  onDriverToggleChange(hasDriver: boolean): void {
    this.hasDriver = hasDriver;

    if (hasDriver) {
      // adding a driver means fields needs to be validated
      this.f['driver'].setValidators(Validators.required);
    } else {
      // otherwhise, not required
      this.f['driver'].clearValidators();
      this.f['driver'].setValue(null);
    }

    this.f['driver'].updateValueAndValidity();
  }

  // generate a random unique ID
  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  // Simulate form submission
  onSubmit(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      console.error('Formulaire Invalide. Veuillez corriger les erreurs.');
      return;
    }

    const newVehicle: Vehicle = {
      id: this.generateId(),
      ...this.vehicleForm.value,
    };

    this.vehicleService
      .create(newVehicle)
      .pipe(take(1))
      .subscribe({
        next: (v) => {
          console.log('Véhicule créé avec succès:', v);
          alert(`Véhicule ${v.licensePlate} créé !`);
          this.vehicleForm.reset({ isActive: true });
          this.hasDriver = false;
        },
        error: (err) => console.error('Erreur lors de la création du véhicule:', err),
      });
  }
}

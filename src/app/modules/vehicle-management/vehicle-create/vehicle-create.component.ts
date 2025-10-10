import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
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
import { FuelType } from '@shared/models';
import { Driver } from '@shared/models';
import { Subject, takeUntil } from 'rxjs';
import { TEXT_CONTENT } from '@shared/data/content.data';

// Typed form group for vehicle creation form
interface VehicleForm {
  licensePlate: FormControl<string>;
  brand: FormControl<string>;
  model: FormControl<string>;
  year: FormControl<number | null>;
  fuelType: FormControl<FuelType | null>;
  capacity: FormControl<number | null>;
  isActive: FormControl<boolean>;
  maintenanceDate: FormControl<Date | null>;
  driver: FormControl<Driver | null>;
}

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
  ],
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCreateComponent implements OnDestroy {
  readonly REQUIRED_ERROR_MSG = TEXT_CONTENT.error.required;
  vehicleForm: FormGroup<VehicleForm>;
  hasDriver = false;
  hasDriverControl = new FormControl(false);
  private destroy$ = new Subject<void>();

  // Define reactive form with validation for vehicle
  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group<VehicleForm>({
      licensePlate: this.fb.control<string>('', {
        validators: [Validators.required, Validators.pattern(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/i)],
        nonNullable: true,
      }),
      brand: this.fb.control<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      model: this.fb.control<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      year: this.fb.control<number | null>(null, {
        validators: [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear() + 1),
        ],
      }),
      fuelType: this.fb.control<FuelType | null>(null, {
        validators: [Validators.required],
      }),
      capacity: this.fb.control<number | null>(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      isActive: this.fb.control<boolean>(true, { nonNullable: true }),
      maintenanceDate: this.fb.control<Date | null>(null),
      driver: this.fb.control<Driver | null>(null),
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
      this.f.driver.setValidators(Validators.required);
    } else {
      // otherwhise, not required
      this.f.driver.clearValidators();
      this.f.driver.setValue(null);
    }

    this.f.driver.updateValueAndValidity();
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
      licensePlate: this.vehicleForm.value.licensePlate!,
      brand: this.vehicleForm.value.brand!,
      model: this.vehicleForm.value.model!,
      year: this.vehicleForm.value.year!,
      fuelType: this.vehicleForm.value.fuelType!,
      capacity: this.vehicleForm.value.capacity!,
      isActive: this.vehicleForm.value.isActive!,
      maintenanceDate: this.vehicleForm.value.maintenanceDate ?? undefined,
      driver: this.vehicleForm.value.driver ?? undefined,
    };

    this.vehicleService
      .create(newVehicle)
      .pipe(takeUntil(this.destroy$))
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { FuelType } from '@shared/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fuel-type-control',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  template: `
    <mat-form-field>
      <mat-label>Type de carburant</mat-label>
      <mat-select [ngModel]="value" (ngModelChange)="onValueChange($event)">
        @for (type of fuelTypes; track type) {
        <mat-option [value]="type">
          {{ type }}
        </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FuelTypeControlComponent), // Allow FuelTypeControl to be used as a form control
      multi: true,
    },
  ],
})
export class FuelTypeControlComponent implements ControlValueAccessor {
  fuelTypes = Object.values(FuelType);
  value: FuelType | null = null;
  isDisabled = false;

  onChange: (value: FuelType | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: FuelType): void {
    this.value = value;
  }

  registerOnChange(fn: (value: FuelType | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange(value: FuelType): void {
    this.value = value;
    this.onChange(this.value); // Notifier Angular du changement
  }
}

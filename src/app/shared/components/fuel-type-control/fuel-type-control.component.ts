import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FuelType } from '@shared/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fuel-type-control',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field>
      <mat-label>Type de carburant</mat-label>
      <mat-select [(value)]="selectedFuelType">
        @for (type of fuelTypes; track type) {
        <mat-option [value]="type">
          {{ type }}
        </mat-option>
        }
      </mat-select>
    </mat-form-field>
    @if (selectedFuelType) {
    <p>Carburant sélectionné : {{ selectedFuelType }}</p>
    }
  `,
  styles: [``],
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
})
export class FuelTypeControlComponent {
  selectedFuelType: any;
  fuelTypes = Object.values(FuelType);
}

// vehicle-list.component.ts

import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { VehicleService } from '@core/services/vehicle.service';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { Vehicle } from '@shared/models/vehicle.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ColDef } from 'ag-grid-community';
import { MatInputModule } from '@angular/material/input';
import { FuelType } from '@shared/models';

@Component({
  selector: 'app-vehicle-list',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AgGridModule, MatFormFieldModule, MatInputModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  destroy$ = new Subject<void>();
  filteredVehicles$!: Observable<Vehicle[]>;

  // Define grid columns
  columnDefs: ColDef<Vehicle>[] = [
    { field: 'licensePlate', headerName: 'Immatriculation' as string, editable: true },
    { field: 'brand', headerName: 'Marque' as string, editable: true },
    { field: 'model', headerName: 'Modèle' as string, editable: true },
    { field: 'year', headerName: 'Année' as string, editable: true },
    {
      field: 'fuelType',
      headerName: 'Carburant' as string,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: Object.values(FuelType),
      },
    },
    { field: 'capacity', headerName: 'Places' as string, editable: true },
    {
      field: 'isActive',
      headerName: 'Actif' as string,
      editable: true,
      valueFormatter: (params: { value: any }) => (params.value ? 'Oui' : 'Non'),
    },
    {
      field: 'driver',
      headerName: 'Conducteur' as string,
      valueFormatter: (params) => {
        const driver = params.value;

        if (driver) {
          const name = `${driver.firstName || ''} ${driver.lastName || ''}`;
          const license = driver.licenseNumber ? ` (${driver.licenseNumber})` : '';

          return name.trim() + license;
        }

        return 'Non Assigné'; // if not defined
      },
    },
    { field: 'maintenanceDate', headerName: 'Date de maintenance' as string, editable: true },
    {
      headerName: 'Actions' as string,
      cellRenderer: (params: any) => {
        return `<button class='delete-btn'>Supprimer</button>`;
      },
    },
  ] as ColDef<Vehicle>[];

  rowData: Vehicle[] = [];

  constructor(public vehicleService: VehicleService) {
    this.filteredVehicles$ = this.vehicleService.filteredVehicles$;
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => {
        this.vehicleService.setSearchTerm(term || '');
      });
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.colDef.headerName === 'Actions') {
        if (event.event.target.classList.contains('delete-btn')) {
          this.deleteVehicle(event.data.id);
        }
      }
    });
  }

  // Handle cell value update as if we were calling a real backend
  onCellValueChanged(event: any) {
    const updatedVehicle: Vehicle = event.data;

    this.vehicleService
      .update(updatedVehicle)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log(`Véhicule ${updatedVehicle.licensePlate} mis à jour.`);
        },
        error: (err) => console.error('Erreur lors de la mise à jour:', err),
      });
  }

  deleteVehicle(id: number) {
    if (confirm(`Confirmer la suppression ?`)) {
      this.vehicleService.delete(id).subscribe({
        error: (err) => console.error('Erreur de suppression:', err),
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

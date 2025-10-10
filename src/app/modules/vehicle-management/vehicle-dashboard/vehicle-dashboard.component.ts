import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component'; // Assurez-vous du chemin
import { VehicleCreateComponent } from '../vehicle-create/vehicle-create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vehicle-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    VehicleListComponent,
    VehicleCreateComponent, // Optionnel, si on veut l'intégrer ici ou le router ailleurs
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDashboardComponent {
  // Toggle for displaying the vehicle creation form
  showCreateForm = false;

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }
}

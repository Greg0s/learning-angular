import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleDashboardComponent } from '@modules/vehicle-management/vehicle-dashboard/vehicle-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VehicleDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('jnjdevelopment-test-technique');
}

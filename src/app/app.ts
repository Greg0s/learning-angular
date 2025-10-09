import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuelTypeControlComponent } from '@shared/components/fuel-type-control/fuel-type-control.component';
import { DriverFormComponent } from '@shared/components/driver-form/driver-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FuelTypeControlComponent, DriverFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('jnjdevelopment-test-technique');
}

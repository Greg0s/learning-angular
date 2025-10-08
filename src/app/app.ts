import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuelTypeControlComponent } from '@shared/components/fuel-type-control/fuel-type-control.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FuelTypeControlComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('jnjdevelopment-test-technique');
}

import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-driver-form',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class DriverFormComponent {
  readonly REQUIRED_ERROR_MSG = 'Ce champ est requis.';

  driverForm = new FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    licenseNumber: FormControl<string | null>;
  }>({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zÀ-ÿ\\s-]+$'), // letters/spaces/dashs
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zÀ-ÿ\\s-]+$'), // letters/spaces/dashs
    ]),
    licenseNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{12}$'), // 12 digits
    ]),
  });

  onSubmit() {
    if (this.driverForm.valid) {
      console.log(this.driverForm.value);
    } else {
      this.driverForm.markAllAsTouched(); // Display errors
    }
  }
}

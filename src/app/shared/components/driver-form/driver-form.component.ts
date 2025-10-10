import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Driver } from '@shared/models/driver.model';
import { TEXT_CONTENT } from '@shared/data/content.data';
@Component({
  selector: 'app-driver-form',
  standalone: true,
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss'],

  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DriverFormComponent), // Allow DriverFormComponent to be used as a form control
      multi: true,
    },
  ],
})
export class DriverFormComponent implements ControlValueAccessor, OnDestroy {
  readonly REQUIRED_ERROR_MSG = TEXT_CONTENT.error.required;

  // Define reactive form with validation for driver
  driverForm = new FormGroup<{
    [key in keyof Omit<Driver, 'id'>]: FormControl<Driver[key] | null>;
  }>({
    firstName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^[A-Za-zÀ-ÿ\\s-]+$'),
    ]),
    lastName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^[A-Za-zÀ-ÿ\\s-]+$'),
    ]),
    licenseNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^\\d{12}$'),
    ]),
  });

  onChange: (value: Driver | null) => void = () => {};
  onTouched: () => void = () => {};

  private destroy$ = new Subject<void>();

  constructor() {
    // Listen for changes and tell parent
    this.driverForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      const driverValue: Driver = {
        id: Date.now(),
        firstName: value.firstName!,
        lastName: value.lastName!,
        licenseNumber: value.licenseNumber!,
      };
      this.onChange(driverValue);
    });
  }

  writeValue(value: Driver | null): void {
    if (value) {
      // avoid infinite loop of valueChanges
      this.driverForm.patchValue(value, { emitEvent: false });
    } else {
      this.driverForm.reset(undefined, { emitEvent: false });
    }
  }

  // Register the change function
  registerOnChange(fn: (value: Driver | null) => void): void {
    this.onChange = fn;
  }

  // Register the touched function
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Touch fields when form lost focus
  handleBlur(): void {
    this.onTouched();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

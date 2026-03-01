import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  signal,
} from '@angular/core'
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'app-millimeters',
  imports: [FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-group" (click)="touch()">
      <label class="form-label" [for]="inputId()"><ng-content /></label>
      <div class="input-group">
        <input
          [id]="inputId()"
          class="form-control"
          type="number"
          step="0.1"
          [(ngModel)]="value"
          [disabled]="isDisabled()"
          (blur)="touch()"
        />
        <span class="input-group-text">mm</span>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MillimetersComponent),
      multi: true,
    },
  ],
})
export class MillimetersComponent implements ControlValueAccessor {
  value = signal<number | null>(null)
  isDisabled = signal(false)
  inputId = signal(`mm-input-${Math.random().toString(36).slice(2, 9)}`)

  constructor() {
    effect(() => {
      const pt = ((this.value() ?? 0) / 25.4) * 72
      this.onChange(pt)
    })
  }

  private onChange: (value: number | null) => void = () => {}
  private onTouched: () => void = () => {}

  writeValue(pt: number | null): void {
    const mm = ((pt ?? 0) * 25.4) / 72
    this.value.set(Math.round(mm * 10) / 10)
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled)
  }

  touch(): void {
    this.onTouched()
  }
}

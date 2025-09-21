import { Component, inject } from '@angular/core'

import { frmLayout } from '../generator.service'
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'app-barcode-layout',
  imports: [ReactiveFormsModule],
  templateUrl: './barcode-layout.component.html',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BarcodeLayoutComponent {
  form: FormGroup<{ layout: frmLayout }> | null = null
  #parent = inject(FormGroupDirective)

  ngOnInit(): void {
    this.form = this.#parent.form
  }
}

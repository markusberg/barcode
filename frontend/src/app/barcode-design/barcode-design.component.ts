import { Component, inject, OnInit } from '@angular/core'

import { frmDesign } from '../generator.service'
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'app-barcode-design',
  imports: [ReactiveFormsModule],
  templateUrl: './barcode-design.component.html',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BarcodeDesignComponent implements OnInit {
  #parent = inject(FormGroupDirective)
  form: FormGroup<{ design: frmDesign }> | null = null
  ngOnInit(): void {
    this.form = this.#parent.form
  }
}

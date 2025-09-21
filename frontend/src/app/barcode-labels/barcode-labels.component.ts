import { Component, inject, OnInit } from '@angular/core'

import {
  ControlContainer,
  FormArray,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms'
import { frmLabel, GeneratorService } from '../generator.service'

interface Tapetype {
  name: string
  id: string
}

@Component({
  selector: 'app-barcode-labels',
  imports: [ReactiveFormsModule],
  templateUrl: './barcode-labels.component.html',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BarcodeLabelsComponent implements OnInit {
  #barcodeService = inject(GeneratorService)
  #parent = inject(FormGroupDirective)

  form: FormGroup<{ labels: FormArray<frmLabel> }> | null = null

  ngOnInit(): void {
    this.form = this.#parent.form
  }

  onTapetypeChange(label: frmLabel) {
    switch (label.controls['tapetype'].value) {
      case 'custom':
        break
      case 'DLT':
        label.controls['suffix'].setValue('xx')
        break
      default:
        label.controls['suffix'].setValue(label.controls['tapetype'].value)
    }
  }

  tapetypes: Tapetype[] = [
    { name: 'Super DLT', id: 'DLT' },
    { name: 'LTO-3', id: 'L3' },
    { name: 'LTO-4', id: 'L4' },
    { name: 'LTO-5', id: 'L5' },
    { name: 'LTO-6', id: 'L6' },
    { name: 'LTO-6 Worm', id: 'LW' },
    { name: 'LTO-7', id: 'L7' },
    { name: 'LTO-8', id: 'L8' },
    { name: 'Cleaning Unit', id: 'CU' },
    { name: 'Custom...', id: 'custom' },
  ]

  onNumBlur(label: frmLabel): void {
    if (label.controls['num'].invalid) {
      label.controls['num'].setValue(1)
    }
  }

  appendCopy(label: frmLabel): void {
    if (this.form) {
      this.form.controls.labels.push(
        this.#barcodeService.buildLabel({ ...label.getRawValue() }),
      )
    }
  }

  removeLabels(idx: number): void {
    if (this.form) {
      this.form.controls.labels.removeAt(idx)
    }
  }

  isLast(idx: number): boolean {
    if (this.form) {
      const idxLast = this.form.controls.labels.length - 1
      return idx === idxLast
    }
    return true
  }
}

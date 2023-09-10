import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormArray, ReactiveFormsModule } from '@angular/forms'
import { frmLabel, GeneratorService } from '../generator.service'

interface Tapetype {
  name: string
  id: string
}

@Component({
  selector: 'app-barcode-labels',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './barcode-labels.component.html',
  styleUrls: ['./barcode-labels.component.scss'],
})
export class BarcodeLabelsComponent {
  @Input() form: FormArray<frmLabel> | null = null

  constructor(private barcodeService: GeneratorService) {}

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
    this.form?.push(this.barcodeService.buildLabel({ ...label.getRawValue() }))
  }

  removeLabels(idx: number): void {
    this.form?.removeAt(idx)
  }

  isLast(idx: number): boolean {
    return idx === (this.form?.length || 0) - 1
  }
}

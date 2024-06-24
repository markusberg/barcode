import { Component, input } from '@angular/core'

import { frmLayout } from '../generator.service'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-barcode-layout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './barcode-layout.component.html',
})
export class BarcodeLayoutComponent {
  form = input.required<frmLayout>()
}

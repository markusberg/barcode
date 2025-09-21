import { Component, input } from '@angular/core'

import { frmDesign } from '../generator.service'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-barcode-design',
  imports: [ReactiveFormsModule],
  templateUrl: './barcode-design.component.html',
})
export class BarcodeDesignComponent {
  form = input.required<frmDesign>()
}

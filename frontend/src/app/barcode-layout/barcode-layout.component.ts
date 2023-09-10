import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { frmLayout } from '../generator.service'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-barcode-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './barcode-layout.component.html',
  styleUrls: ['./barcode-layout.component.scss'],
})
export class BarcodeLayoutComponent {
  @Input() form: frmLayout | null = null
}

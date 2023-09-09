import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IDesignForm } from '../barcode.service'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-barcode-design',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './barcode-design.component.html',
  styleUrls: ['./barcode-design.component.scss'],
})
export class BarcodeDesignComponent {
  @Input() form: IDesignForm | null = null
}

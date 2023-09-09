import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLabelsComponent } from './barcode-labels.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BarcodeLabelsComponent', () => {
  let component: BarcodeLabelsComponent
  let fixture: ComponentFixture<BarcodeLabelsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeLabelsComponent, HttpClientTestingModule],
    })
    fixture = TestBed.createComponent(BarcodeLabelsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

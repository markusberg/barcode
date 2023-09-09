import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeComponent } from './barcode.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BarcodeComponent', () => {
  let component: BarcodeComponent
  let fixture: ComponentFixture<BarcodeComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeComponent, HttpClientTestingModule],
    })
    fixture = TestBed.createComponent(BarcodeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

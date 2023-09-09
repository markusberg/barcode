import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLayoutComponent } from './barcode-layout.component'

describe('BarcodeLayoutComponent', () => {
  let component: BarcodeLayoutComponent
  let fixture: ComponentFixture<BarcodeLayoutComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeLayoutComponent],
    })
    fixture = TestBed.createComponent(BarcodeLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

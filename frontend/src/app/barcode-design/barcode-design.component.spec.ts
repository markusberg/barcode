import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeDesignComponent } from './barcode-design.component'

describe('BarcodeDesignComponent', () => {
  let component: BarcodeDesignComponent
  let fixture: ComponentFixture<BarcodeDesignComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeDesignComponent],
    })
    fixture = TestBed.createComponent(BarcodeDesignComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeComponent } from './barcode.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('BarcodeComponent', () => {
  let component: BarcodeComponent
  let fixture: ComponentFixture<BarcodeComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
    fixture = TestBed.createComponent(BarcodeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

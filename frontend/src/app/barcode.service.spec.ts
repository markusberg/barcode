import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { BarcodeService } from './barcode.service'

describe('BarcodeService', () => {
  let service: BarcodeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(BarcodeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

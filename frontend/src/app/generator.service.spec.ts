import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { GeneratorService } from './generator.service'

describe('BarcodeService', () => {
  let service: GeneratorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(GeneratorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

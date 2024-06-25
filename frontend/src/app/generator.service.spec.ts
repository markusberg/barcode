import { TestBed } from '@angular/core/testing'
import { provideHttpClientTesting } from '@angular/common/http/testing'

import { GeneratorService } from './generator.service'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('BarcodeService', () => {
  let service: GeneratorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
    service = TestBed.inject(GeneratorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'

import { AppSettingsService } from './app-settings.service'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('AppSettingsService', () => {
  let service: AppSettingsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
    service = TestBed.inject(AppSettingsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

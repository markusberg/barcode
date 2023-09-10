import { TestBed } from '@angular/core/testing'

import { AppSettingsService } from './app-settings.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('AppSettingsService', () => {
  let service: AppSettingsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(AppSettingsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

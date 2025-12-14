import { provideZonelessChangeDetection } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideRouter } from '@angular/router'
import { BarcodeComponent } from './app/barcode/barcode.component'
import { provideHttpClient } from '@angular/common/http'
import { AboutComponent } from './app/about/about.component'

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter([
      { path: '', component: BarcodeComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
})

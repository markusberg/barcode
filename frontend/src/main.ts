import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideRouter } from '@angular/router'
import { BarcodeComponent } from './app/barcode/barcode.component'
import { provideHttpClient } from '@angular/common/http'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([{ path: '**', component: BarcodeComponent }]),
  ],
})

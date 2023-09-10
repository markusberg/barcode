import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenubarComponent } from './menubar/menubar.component'
import { EnvBannerComponent } from './env-banner/env-banner.component'

@Component({
  selector: 'app-root',
  template: `<app-env-banner></app-env-banner>
    <app-menubar></app-menubar>
    <router-outlet></router-outlet>`,
  standalone: true,
  imports: [CommonModule, EnvBannerComponent, MenubarComponent, RouterModule],
})
export class AppComponent {
  title = 'frontend'
}

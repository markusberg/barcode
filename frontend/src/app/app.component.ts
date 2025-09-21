import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenubarComponent } from './menubar/menubar.component'
import { EnvBannerComponent } from './env-banner/env-banner.component'

@Component({
  selector: 'app-root',
  template: `
    <div class="sticky-top"><app-menubar /><app-env-banner /></div>
    <div class="my-3"><router-outlet /></div>
  `,
  imports: [EnvBannerComponent, MenubarComponent, RouterModule],
})
export class AppComponent {
  title = 'frontend'
}

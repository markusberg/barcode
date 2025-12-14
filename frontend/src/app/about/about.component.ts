import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './about.component.html',
  styles: [
    `
      a[target='_blank']::after {
        display: inline-block;
        padding-left: 0.5rem;
        content: '\\f1c5';
        font-family: 'bootstrap-icons' !important;
        font-weight: 400 !important;
        font-style: normal;
        font-size: small;
      }
    `,
  ],
})
export class AboutComponent {}

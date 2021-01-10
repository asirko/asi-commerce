import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'eco-core',
  template: `<router-outlet></router-outlet>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {}

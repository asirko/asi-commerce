import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'eco-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {}

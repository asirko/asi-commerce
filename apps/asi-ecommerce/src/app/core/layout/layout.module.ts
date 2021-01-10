import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule, MenuModule],
})
export class LayoutModule {}

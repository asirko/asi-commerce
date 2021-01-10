import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, MatInputModule],
})
export class UserModule {}

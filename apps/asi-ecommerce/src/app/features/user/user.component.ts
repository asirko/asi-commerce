import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'eco-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly userForm = this.fb.group({
    firstName: '',
    lastName: '',
    allowNewsLetter: false,
    adresses: this.fb.array([]),
  });
  readonly adresses = this.userForm.controls.adresses as FormArray;

  constructor(private fb: FormBuilder) {}
}

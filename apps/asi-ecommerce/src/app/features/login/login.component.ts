import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserLogin } from '../../shared/stores/user/user.action';
import { Router } from '@angular/router';

@Component({
  selector: 'eco-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = this.fb.group({
    login: ['test@test.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

  login() {
    if (this.form.valid) {
      this.store.dispatch(new UserLogin(this.form.value.login, this.form.value.password)).subscribe(() => {
        this.router.navigate(['/user']);
      });
    }
  }
}

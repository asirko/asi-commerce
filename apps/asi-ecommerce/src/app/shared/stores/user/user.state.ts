import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as UserActions from './user.action';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import { User } from '@asi-ecommerce/api-interfaces';
import { AuthService } from '../../../core/auth/auth.service';

class UserStateModel {
  user: User;
}

@State<UserState>({
  name: 'user',
  defaults: null,
})
@Injectable()
export class UserState {
  @Selector()
  static getUser(state: UserStateModel): User {
    return state.user;
  }

  constructor(private userService: UserService, private authService: AuthService) {}

  @Action(UserActions.UserInit)
  initUser(ctx: StateContext<UserStateModel>) {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    return this.userService.getUser$().pipe(
      tap(user => ctx.patchState({ user })), //
    );
  }

  @Action(UserActions.UserLogin)
  loginUser(ctx: StateContext<UserStateModel>, { login, password }: UserActions.UserLogin) {
    return this.authService.login$(login, password).pipe(tap(user => ctx.patchState({ user })));
  }

  @Action(UserActions.UserUpdate)
  updateUser(ctx: StateContext<UserStateModel>) {
    // todo
  }
}

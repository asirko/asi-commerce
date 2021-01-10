import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { mapTo } from 'rxjs/operators';

import * as UserActions from './user.action';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.dispatch(new UserActions.UserInit()).pipe(mapTo(true));
  }
}

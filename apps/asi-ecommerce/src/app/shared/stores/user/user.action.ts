import { User } from '@asi-ecommerce/api-interfaces';

export class UserInit {
  static readonly type = '[User] Init the user';
}

export class UserLogin {
  static readonly type = '[User] Login the user';
  constructor(public login: string, public password: string) {}
}

export class UserUpdate {
  static readonly type = '[User] Update the user';
  constructor(public user: User) {}
}

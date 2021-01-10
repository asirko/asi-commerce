import { Injectable } from '@nestjs/common';
import { User } from '@asi-ecommerce/api-interfaces';

@Injectable()
export class UserService {
  getMe(): User {
    return {
      firstName: 'Alexandre',
      lastName: 'Sirko',
      email: 'sirko.alexandre@gmail.com',
      phone: '0607080910',
      allowNewsLetter: false,
      adresses: [{ city: 'Toulouse', name: 'Bureau', postalCode: '31000', street: '37 rue des marchands' }],
    };
  }
}
